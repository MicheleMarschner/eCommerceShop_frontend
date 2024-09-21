import { NextResponse } from 'next/server';

import {Product} from '@/app/models/Product';
import {Category} from '@/app/models/Category';

import { mongooseConnect } from '@/app/lib/mongoose';


export async function GET(req, res) {

    await mongooseConnect();
    let Products = [];
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    let category = searchParams.get('category')

    if (category === "null") category = null
    
    if (id) {
        Products = await Product.findOne({_id:id});
        return NextResponse.json(Products); 
    } else if (category !== null) {
        const categoryId = await Category.find({ name: category }, '_id');
        console.log("categoryId", categoryId)

        Products = await Product.find({category: categoryId});
        return NextResponse.json(Products);
    } else {
        console.log("hier")
        Products = await Product.find({}, null, {sort: {'_id':-1}});
        return NextResponse.json(Products); 
    }
}