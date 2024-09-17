import { NextResponse } from 'next/server';
import { mongooseConnect } from '@/app/lib/mongoose';

const stripe = require('stripe')(process.env.STRIPE_SK);
import { Order } from '@/app/models/Order';

export async function POST(req, res) {

    await mongooseConnect();
    let sig;

    for (let [key, value] of req.headers.entries()) {
        if (key.toLowerCase() === 'stripe-signature') {
            sig = value;
        }
    }

    let event;
    const body = await req.text()
    const endpointSecret = process.env.STRIPE_ENDPOINT_SK;

    if (endpointSecret) {
        
        try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            endpointSecret
        );
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`, err.message);
            return NextResponse.json(400);
        }
    }

    let data = {};
    let orderId = '';
    let paid = false;

    console.log("eventType: ", event.type)

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            data = event.data.object;
            orderId = data.metadata.orderId;
            paid = data.payment_status === 'paid';

            if (orderId && paid) {
                await Order.findByIdAndUpdate(orderId, {paid: true})
            }

            break;

        case 'checkout.session.completed':
            data = event.data.object;
            orderId = data.metadata.orderId;
            paid = data.payment_status === 'paid';

            if (orderId && paid) {
                await Order.findByIdAndUpdate(orderId, {paid: true})
            }

            break;

        case 'charge.updated':
            data = event.data.object;
            orderId = data.metadata.orderId;
            paid = data.payment_status === 'paid';

            if (orderId && paid) {
                await Order.findByIdAndUpdate(orderId, {paid: true})
            }

            break;
            
        default:
            // Unexpected event type
            data = event.data.object;
            orderId = data.metadata.orderId;
            paid = data.payment_status === 'paid';

            if (orderId && paid) {
                await Order.findByIdAndUpdate(orderId, {paid: true})
            } else {
                console.log(`Unhandled event type ${event.type}.`);
            }

            break;
    }
    
    return NextResponse.json(200);
}

 