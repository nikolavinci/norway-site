import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.0.0?target=deno";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY_LIVE') || Deno.env.get('STRIPE_SECRET_KEY_TEST');
const STRIPE_WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET');
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

const stripe = new Stripe(STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(),
});

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');

  if (!signature || !STRIPE_WEBHOOK_SECRET) {
    return new Response('Webhook signature missing or secret not configured', { status: 400 });
  }

  try {
    const body = await req.text();
    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // 1. Update the pending order to completed FIRST
      // This ensures the DB reflects the purchase even if email sending fails.
      const { data: order, error } = await supabaseAdmin
        .from('orders')
        .update({ status: 'completed' })
        .eq('stripe_session_id', session.id)
        .select()
        .single();

      if (error || !order) {
        console.error('Error updating order to completed:', error);
        throw error;
      }

      // 2. Fetch line items for the email
      let orderItems: any[] = [];
      if (order.items && Array.isArray(order.items)) {
        orderItems = order.items;
      } else {
        console.warn('Order items not found in DB, email might be empty.');
      }

      const email = session.customer_details?.email || session.customer_email || order.email;
      let userId = session.client_reference_id || order.user_id;

      // Link guest orders to existing user if userId is null but email matches an account
      if (!userId && email) {
        try {
          const { data, error: rpcError } = await supabaseAdmin.rpc('get_user_id_by_email', { email_address: email });
          if (!rpcError && data) {
            userId = data;
            // Update the order with the found user_id
            await supabaseAdmin.from('orders').update({ user_id: userId }).eq('id', order.id);
          }
        } catch (err) {
          console.error("Error linking guest order to user:", err);
        }
      }

      // Send Email via Resend
      if (RESEND_API_KEY && email) {
        const itemsHtml = orderItems.map(item => 
          `<li style="display: flex; align-items: center; margin-bottom: 10px;">
            ${item.image ? `<img src="${item.image.startsWith('http') ? item.image : (Deno.env.get('SITE_URL') || 'https://pustatelier.no') + item.image}" alt="${item.name}" width="50" style="vertical-align: middle; border-radius: 4px; margin-right: 15px;"/>` : ''}
            <span>${item.quantity}x ${item.name} - ${item.price} NOK</span>
           </li>`
        ).join('');

        const resResend = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Pust Atelier <orders@pustatelier.no>',
            to: [email],
            subject: 'Order Confirmation - Pust Atelier',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #3A3532;">
                <h1 style="color: #5D4E46; border-bottom: 1px solid #eee; padding-bottom: 10px;">Thank you for your order!</h1>
                <p>Hi there,</p>
                <p>We have successfully received your order and are preparing your authentic handcrafted pieces.</p>
                <h3>Order Summary</h3>
                <ul>
                  ${itemsHtml}
                </ul>
                <p><strong>Total:</strong> ${session.amount_total ? session.amount_total / 100 : 0} NOK</p>
                <br/>
                <p>You can view your order status at any time in your <a href="${Deno.env.get('SITE_URL') || 'https://pustatelier.no'}/dashboard/orders" style="color: #987C6F; font-weight: bold;">dashboard</a>.</p>
                <p>Best regards,<br/>The Pust Atelier Team</p>
              </div>
            `
          })
        });
        
        if (!resResend.ok) {
          const errorText = await resResend.text();
          console.error('Error sending email via Resend:', resResend.status, errorText);
        } else {
          console.log('Order confirmation email sent successfully via Resend');
        }
      }
    } else if (event.type === 'checkout.session.expired') {
      const session = event.data.object as Stripe.Checkout.Session;
      await supabaseAdmin.from('orders').update({ status: 'expired' }).eq('stripe_session_id', session.id);
      console.log(`Order updated to expired for session: ${session.id}`);

    } else if (event.type === 'checkout.session.async_payment_failed') {
      const session = event.data.object as Stripe.Checkout.Session;
      await supabaseAdmin.from('orders').update({ status: 'failed' }).eq('stripe_session_id', session.id);
      console.log(`Order updated to failed for session: ${session.id}`);

    } else if (event.type === 'checkout.session.async_payment_succeeded') {
      const session = event.data.object as Stripe.Checkout.Session;
      // Depending on timing, checkout.session.completed might have already fired, but if not:
      await supabaseAdmin.from('orders').update({ status: 'completed' }).eq('stripe_session_id', session.id);
      console.log(`Order updated to completed (async payment succeeded) for session: ${session.id}`);

    } else if (event.type === 'payment_intent.payment_failed') {
      const intent = event.data.object as Stripe.PaymentIntent;
      // We don't always have stripe_session_id on the intent, but if we have a direct payment intent integration, 
      // we can try to find an order with this intent id if we saved it (currently we use session id).
      console.log(`Payment failed for intent: ${intent.id}. Please manually verify if a session was attached.`);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err: any) {
    console.error('Webhook Error:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
});
