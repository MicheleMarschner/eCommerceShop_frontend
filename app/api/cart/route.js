import { NextResponse } from 'next/server';

import {Product} from '@/app/models/Product';
import { mongooseConnect } from '@/app/lib/mongoose';


export async function POST(req, res) {
    const body = await req.json(); // Parse the request body as JSON
    const { ids } = body;


    await mongooseConnect();
    let Products = [];
    
    Products = await Product.find({_id: ids});
    return NextResponse.json(Products); 
}