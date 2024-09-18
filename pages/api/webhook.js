import { buffer } from 'micro';
import { mongooseConnect } from '@/app/lib/mongoose';
const stripe = require('stripe')(process.env.STRIPE_SK);
import { Order } from '@/app/models/Order';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await mongooseConnect();

    // Get the Stripe signature from the headers
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_ENDPOINT_SK;

    // Ensure the body is passed as raw string (buffer)
    let event;
    const buf = await buffer(req); // Capture the raw request body
    const rawBody = buf.toString();

    // Verify the signature and construct the event
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,         // Raw request body
        sig,             // Stripe signature
        endpointSecret   // Webhook secret
      );
    } catch (err) {
      console.error('⚠️  Webhook signature verification failed:', {"sig": sig, "request": req});
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    let orderId;
    let paid = false;

    // Handle the event type
    switch (event.type) {
      case 'checkout.session.completed':
        const object = event.data.object; // Extract the checkout session data
        orderId = object.metadata.orderId;
        paid = object.payment_status === 'paid';

        if (orderId && paid) {
          // Update the order in your database
          await Order.findByIdAndUpdate(orderId, { paid: true });
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Send back a response to Stripe to acknowledge receipt of the event
    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

// Disable Next.js body parsing for this route (required by Stripe for signature verification)
export const config = {
  api: {
    bodyParser: false, // We need to handle raw body for Stripe webhook
  },
};
