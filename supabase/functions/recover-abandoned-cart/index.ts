import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { orderId, couponCode } = await req.json();

    if (!orderId) {
      throw new Error("Order ID is required");
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch the pending order
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      throw new Error("Order not found or database error");
    }

    if (order.status !== 'pending') {
      throw new Error("Only pending orders can be recovered");
    }

    if (!order.email) {
      throw new Error("No email associated with this order");
    }

    if (!RESEND_API_KEY) {
      throw new Error("Resend API Key is missing");
    }

    let couponText = '';
    if (couponCode) {
      // Validate coupon
      const { data: coupon, error: couponError } = await supabaseAdmin
        .from('coupons')
        .select('*')
        .eq('code', couponCode)
        .eq('is_active', true)
        .single();

      if (coupon && !couponError) {
        const discountStr = coupon.discount_type === 'flat' 
          ? `${coupon.discount_amount} NOK off` 
          : `${coupon.discount_percentage}% off`;
        couponText = `
          <div style="background-color: #FDFBF7; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; border: 1px dashed #987C6F;">
            <p style="margin: 0; color: #5D4E46; font-size: 16px;">As a special gift, use code at checkout for <strong>${discountStr}</strong> your entire order!</p>
            <h2 style="margin: 10px 0 0 0; color: #987C6F; font-size: 24px; letter-spacing: 2px;">${couponCode}</h2>
          </div>
        `;
      }
    }

    let itemsHtml = '';
    if (order.items && Array.isArray(order.items)) {
      itemsHtml = order.items.map(item => 
        `<li style="display: flex; align-items: center; margin-bottom: 10px;">
          ${item.image ? `<img src="${item.image.startsWith('http') ? item.image : (Deno.env.get('SITE_URL') || 'https://pustatelier.no') + item.image}" alt="${item.name}" width="50" style="vertical-align: middle; border-radius: 4px; margin-right: 15px;"/>` : ''}
          <span>${item.quantity}x ${item.name} - ${item.price} NOK</span>
         </li>`
      ).join('');
    }

    const cartUrl = `${Deno.env.get('SITE_URL') || 'https://pustatelier.no'}/cart`;

    const resResend = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Pust Atelier <orders@pustatelier.no>',
        to: [order.email],
        subject: 'You left something behind...',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #3A3532;">
            <h1 style="color: #5D4E46; border-bottom: 1px solid #eee; padding-bottom: 10px;">Still thinking about it?</h1>
            <p>Hi there,</p>
            <p>We noticed you left some beautiful pieces in your cart. Our handcrafted bags are made in limited quantities, so make sure to grab them before they're gone!</p>
            
            ${couponText}

            <div style="margin: 30px 0;">
              <a href="${cartUrl}" style="background-color: #5D4E46; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Return to Cart</a>
            </div>

            ${itemsHtml ? `
            <h3>Your Cart Items</h3>
            <ul style="list-style: none; padding: 0;">
              ${itemsHtml}
            </ul>
            ` : ''}
            <br/>
            <p>Best regards,<br/>The Pust Atelier Team</p>
          </div>
        `
      })
    });
    
    if (!resResend.ok) {
      const errorText = await resResend.text();
      console.error('Error sending email via Resend:', resResend.status, errorText);
      throw new Error(`Failed to send email: ${resResend.status}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
