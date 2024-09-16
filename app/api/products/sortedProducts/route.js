import { NextResponse } from 'next/server';

import {Product} from '@/app/models/Product';
import { mongooseConnect } from '@/app/lib/mongoose';

export async function GET(req, res) {

    await mongooseConnect();
    let Products = [];
    
    Products = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
    return NextResponse.json(Products); 
}