import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  // Ensure the SIGNING_SECRET is set in environment variables
  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env.local');
  }

  // Get headers for Svix signature verification
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If headers are missing, return an error
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    });
  }

  // Parse the body of the webhook event
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with the Signing Secret
  const wh = new Webhook(SIGNING_SECRET);
  let evt: WebhookEvent;

  // Verify the webhook signature
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error: Could not verify webhook:', err);
    return new Response('Error: Verification failed', {
      status: 400,
    });
  }

  // Do something with the payload (e.g., log it or save to your DB)
  console.log('Received webhook payload:', body);

  // Example: check the event type and handle it
  if (evt.type === 'user.created') {
    console.log('New user created:', evt.data.id);
    // Add logic to handle user creation (e.g., insert user data into your database)
  }

  // Respond with 200 to acknowledge receipt of the webhook
  return new Response('Webhook received', { status: 200 });
}
