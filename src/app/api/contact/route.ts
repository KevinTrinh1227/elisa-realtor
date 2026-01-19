import { NextRequest, NextResponse } from 'next/server';

// Discord webhook for contact form notifications (demo mode)
const DISCORD_WEBHOOK = process.env.DISCORD_CONTACT_WEBHOOK;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Log the submission (for demo mode)
    console.log('Contact form submission:', { name, email, phone, message: message.substring(0, 100) });

    // Send to Discord webhook (demo mode)
    if (DISCORD_WEBHOOK) {
      try {
        await fetch(DISCORD_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            embeds: [
              {
                title: 'New Contact Form Submission',
                color: 0xc9a227, // Gold accent color
                fields: [
                  { name: 'Name', value: name, inline: true },
                  { name: 'Email', value: email, inline: true },
                  { name: 'Phone', value: phone || 'Not provided', inline: true },
                  { name: 'Message', value: message.substring(0, 1000) },
                ],
                timestamp: new Date().toISOString(),
                footer: {
                  text: 'Elisa Rocha Real Estate Website',
                },
              },
            ],
          }),
        });
      } catch (webhookError) {
        console.error('Discord webhook error:', webhookError);
        // Don't fail the request if webhook fails
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
