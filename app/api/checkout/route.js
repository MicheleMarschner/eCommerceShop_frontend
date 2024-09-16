import { NextResponse } from 'next/server';

import {Product} from '@/app/models/Product';
import { mongooseConnect } from '@/app/lib/mongoose';
import { Order } from '@/app/models/Order';

const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req, res) { 

    const body = await req.json();

    const { name, email, city, postalCode, streetAddress, country, cartProducts } = body;
    const productIds = cartProducts;
    const uniqueIds = [...new Set(productIds)];

    await mongooseConnect();

    const productsInfos = await Product.find({_id:uniqueIds})

    let line_items = [];
    for (const productId of uniqueIds) {
        const productInfo = productsInfos.find(p => p._id.toString() === productId)
        const quantity = productIds.filter(id => id === productId)?.length || 0;
        if (quantity > 0 && productInfo) {
            line_items.push({
                quantity, 
                price_data: {
                    currency: 'USD',
                    product_data: {name: productInfo.title},
                    unit_amount: productInfo.price * 100,
                }
            })
        }
    }

    const order = await Order.create({line_items, name, email, city, postalCode, streetAddress, country, paid:false,})

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        customer_email: email,
        success_url: `${process.env.PUBLIC_URL}/cart?success=1`,
        cancel_url: `${process.env.PUBLIC_URL}/cart?canceled=1`,
        metadata: {orderId: order._id.toString()}
    })
    return NextResponse.json({
        url: session.url,
    });

}