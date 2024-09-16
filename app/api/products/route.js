import { NextResponse } from 'next/server';

import {Product} from '@/app/models/Product';
import { mongooseConnect } from '@/app/lib/mongoose';


export async function GET(req, res) {

    await mongooseConnect();
    let Products = [];
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (id) {
        Products = await Product.findOne({_id:id});
        return NextResponse.json(Products); 
    } else {
        Products = await Product.find({}, null, {sort: {'_id':-1}});
        return NextResponse.json(Products); 
    }
}