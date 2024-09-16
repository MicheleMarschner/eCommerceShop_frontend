"use client";

import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'next/navigation'

import Center from '@/app/styles/Center'
import Header from '@/app/components/Header'
import styled from 'styled-components'

import axios from 'axios';
import ProductImages from '@/app/components/ProductImages';
import Button from '@/app/styles/Button';
import CartIcon from '@/app/components/icons/CartIcon';

import { CartContext } from '@/app/components/CartContext'; 

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.3rem;
    margin: 2.3rem 0;

    @media screen and (min-width: 768px) {
      grid-template-columns: 1.2fr .8fr;
    }
` 
const WhiteBox = styled.div`
    background-color: #fff;
    border-radius: 0.7rem;
    padding: 1.8rem;

    img {
        max-width: 100%;
    }
`
const Title = styled.h1`
    font-size: 1.5rem;
`

const PriceRow = styled.div`
  display: flex;
  gap: 1.25rem;
  align-items: center;
`

const Price = styled.span`
  font-size: 1.4rem;
`

function ProductPage() {
  const {addProduct} = useContext(CartContext);
  const params = useParams();
  const id = params.id;
  const [ product, setProduct ] = useState([])

  useEffect(() => {

    if (!id) return; 
    
    axios.get('/api/products?id='+id)
        .then(res => setProduct(res.data))
  }, [id])

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
            <WhiteBox>
                <ProductImages images={product.images} />
            </WhiteBox>
            <div>
                <Title>{product.title}</Title>
                <p>{product.description}</p>
                <PriceRow>
                  <div>
                    <Price>${product.price}</Price>
                  </div>
                  <div>
                    <Button $primary onClick={() => addProduct(product._id)}>
                      <CartIcon />Add to Cart
                    </Button>
                  </div>
                </PriceRow>
            </div>
        </ColumnsWrapper>
      </Center>
    </>
  )
}

export default ProductPage
