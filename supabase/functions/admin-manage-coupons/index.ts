import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.0.0?target=deno";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { action, coupon, isLive } = await req.json();

    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error("Missing authorization header");

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(authHeader.replace('Bearer ', ''));
    if (authError || !user) {
      throw new Error("Unauthorized");
    }

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

    if (action === 'create') {
      // 1. Create Stripe Coupon
      const stripeCoupon = await stripe.coupons.create({
        duration: 'once',
        percent_off: coupon.discount_type === 'percentage' ? coupon.discount_percentage : undefined,
        amount_off: coupon.discount_type === 'flat' ? Math.round(coupon.discount_amount * 100) : undefined,
        currency: coupon.discount_type === 'flat' ? 'nok' : undefined,
        name: coupon.code,
      });

      // 2. Insert into Supabase
      const payload = {
        code: coupon.code,
        discount_type: coupon.discount_type,
        discount_percentage: coupon.discount_percentage,
        discount_amount: coupon.discount_amount,
        free_shipping_threshold: coupon.free_shipping_threshold,
        is_active: true,
        stripe_coupon_id: stripeCoupon.id
      };

      const { data, error } = await supabaseAdmin.from('coupons').insert([payload]).select().single();
      
      if (error) throw error;

      return new Response(JSON.stringify({ success: true, coupon: data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400 });
  } catch (error: any) {
    console.error("Error managing coupons:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
