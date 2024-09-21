import { NextResponse } from 'next/server';

import {Category} from '@/app/models/Category';
import { mongooseConnect } from '@/app/lib/mongoose';

export async function GET(req, res) {

    await mongooseConnect();
    let Categories = [];
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    
    if (id) {
        Categories = await Category.findOne({_id:id}).populate('parent');
        return NextResponse.json(Categories); 
    } else {
        Categories = await Category.find().populate('parent');
        return NextResponse.json(Categories); 
    }
}
