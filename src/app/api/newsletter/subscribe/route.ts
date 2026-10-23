import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const discountCode = 'WELCOME20';

    // 1. If RESEND_API_KEY is configured in deployment environment (e.g. Vercel), send email via Resend API
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const fromAddress = process.env.RESEND_FROM_EMAIL || 'Pust Atelier <onboarding@resend.dev>';
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: fromAddress,
            to: [cleanEmail],
            subject: 'Velkommen til Pust Atelier — Your 20% discount code',
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 32px 24px; color: #2C2C2A; background-color: #FDFCF8; border: 1px solid #EBE4DA; border-radius: 16px;">
                <h1 style="color: #5D4E46; font-size: 26px; font-weight: normal; margin-bottom: 16px;">Welcome to Pust Atelier</h1>
                <p style="font-size: 15px; line-height: 1.6; color: #5D4E46; margin-bottom: 24px;">
                  Thank you for subscribing to our newsletter! As promised, here is your personal 20% discount code for your first order:
                </p>
                <div style="background-color: #FFFFFF; border: 2px dashed #987C6F; border-radius: 10px; padding: 18px; text-align: center; margin: 24px 0;">
                  <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #987C6F; display: block; margin-bottom: 6px;">Your Promo Code</span>
                  <span style="font-family: monospace; font-size: 26px; font-weight: bold; color: #5D4E46; letter-spacing: 3px;">${discountCode}</span>
                </div>
                <p style="font-size: 13px; line-height: 1.6; color: #7A6B63; margin-bottom: 28px;">
                  Enter this code at checkout to enjoy 20% off authentic handcrafted cushion covers, blankets, shawls, and quilt bags made by artisans in Nepal.
                </p>
                <div style="text-align: center;">
                  <a href="https://pustatelier.no/shop" style="display: inline-block; background-color: #5D4E46; color: #FFFFFF; text-decoration: none; font-size: 14px; font-weight: 500; padding: 12px 28px; border-radius: 9999px;">
                    Visit Shop
                  </a>
                </div>
                <hr style="border: none; border-top: 1px solid #EBE4DA; margin: 32px 0 20px;" />
                <p style="font-size: 11px; color: #987C6F; text-align: center; line-height: 1.5;">
                  Pust Atelier Oslo · Org. no. 938 220 530 · pustatelier@gmail.com<br />
                  You received this email because you signed up for updates on our website.
                </p>
              </div>
            `,
          }),
        });

        if (!res.ok) {
          const errText = await res.text();
          console.error('Failed sending newsletter email via Resend:', errText);
        }
      } catch (err) {
        console.error('Error invoking Resend email delivery:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Discount code has been sent to your email',
    });
  } catch (error: any) {
    console.error('Newsletter subscribe error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
