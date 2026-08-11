import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.0.0?target=deno";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { items, email, userId, isLive, origin, couponCode } = await req.json();
    const baseUrl = origin || req.headers.get('origin') || 'http://localhost:3000';

    // Get the correct secret key from environment variables based on the database flag
    const STRIPE_SECRET_KEY = isLive 
      ? Deno.env.get('STRIPE_SECRET_KEY_LIVE') 
      : Deno.env.get('STRIPE_SECRET_KEY_TEST');

    if (!STRIPE_SECRET_KEY) {
      throw new Error("Stripe secret key not configured.");
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
      httpClient: Stripe.createFetchHttpClient(),
    });

    const lineItems = items.map((item: any) => {
      const imageUrl = item.image ? (item.image.startsWith('http') ? item.image : `${baseUrl}${item.image.startsWith('/') ? '' : '/'}${item.image}`) : null;
      return {
        price_data: {
          currency: 'nok',
          product_data: {
            name: item.name,
            images: imageUrl ? [imageUrl] : [],
            metadata: {
              product_id: item.id
            }
          },
          unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents/øre
        },
        quantity: item.quantity,
      };
    });

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    let discounts = undefined;
    if (couponCode) {
      // Check if this email has already used this coupon
      const { data: existingUsage } = await supabaseAdmin
        .from('orders')
        .select('id')
        .eq('email', email)
        .eq('coupon_code', couponCode)
        .eq('status', 'completed')
        .limit(1)
        .maybeSingle();

      if (existingUsage) {
        throw new Error("The coupon has already been used.");
      }

      const { data: coupon } = await supabaseAdmin
        .from('coupons')
        .select('*')
        .eq('code', couponCode)
        .eq('is_active', true)
        .single();

      if (coupon) {
        try {
          const stripeCoupon = await stripe.coupons.create({
            duration: 'once',
            percent_off: coupon.discount_type === 'percentage' ? coupon.discount_percentage : undefined,
            amount_off: coupon.discount_type === 'flat' ? Math.round(coupon.discount_amount * 100) : undefined,
            currency: coupon.discount_type === 'flat' ? 'nok' : undefined,
            name: coupon.code,
          });
          discounts = [{ coupon: stripeCoupon.id }];
        } catch (err) {
          console.error("Failed to create Stripe coupon:", err);
        }
      }
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'klarna'],
      line_items: lineItems,
      mode: 'payment',
      discounts: discounts,
      invoice_creation: {
        enabled: true,
      },
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
      customer_email: email,
      client_reference_id: userId,
    });

    // Get real userId from email if not provided (guest linking)
    let actualUserId = userId || null;
    if (!actualUserId && email) {
      const { data } = await supabaseAdmin.rpc('get_user_id_by_email', { email_address: email });
      if (data) actualUserId = data;
    }

    const orderTotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

    // Pre-create the order in "pending" status (Abandoned Cart tracking)
    const { data: order, error } = await supabaseAdmin.from('orders').insert({
      user_id: actualUserId,
      email: email,
      status: 'pending',
      total: orderTotal,
      stripe_session_id: session.id,
      coupon_code: couponCode || null,
      items: items // Store full cart JSON
    }).select().single();

    if (error) {
      console.error("Error creating pending order:", error);
    } else {
      // Insert order items
      const orderItems = items.map((item: any) => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_time: item.price
      }));
      await supabaseAdmin.from('order_items').insert(orderItems);
    }

    return new Response(
      JSON.stringify({ sessionId: session.id, url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
