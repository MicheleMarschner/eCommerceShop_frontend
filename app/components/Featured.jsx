"use client";

import React, { useContext, useEffect, useState } from 'react'
import Center from '../styles/Center'
import styled from 'styled-components'
import ButtonLink from '../styles/ButtonLink'
import CartIcon from './icons/CartIcon';

import axios from 'axios';
import { CartContext } from './CartContext';


const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 3.1rem 0;
`

const Title = styled.h1`
    margin: 0;
    font-weigth: normal;
    font-size: 1.5rem;

    @media screen and (min-width: 768px) {
        font-size: 2.6rem;
    }
`

const Desc = styled.p`
    color: #aaa;
    font-size: 0.8rem;
`

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.8rem;
    padding-bottom: 1.5rem;

    @media screen and (min-width: 768px) {
        grid-template-columns: 1.1fr .9fr;
        
        div:nth-child(1) {
            order: 2;
        }
    }
`

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 0.7rem;
    margin-top: 1.7rem;
`

const Column = styled.div`
    display: flex;
    align-items: center;
    
    img {
        height: 100%;
        max-height: 200px;
        display: block;
        margin: 0 auto;
    }

    @media screen and (min-width: 768px) {
        img {
            height: 100%;
        }
    }
`

function Featured() {
  const {addProduct} = useContext(CartContext);
  const [ featuredProduct, setFeaturedProduct ] = useState([])

  useEffect(() => {

    const id = "66cada4a48a3b470b433f65c"

    axios.get('/api/products?id='+id, 
        { next: { revalidate: 1*360*24}}
      )
      .then(res => {
        console.log(res.data)
        setFeaturedProduct(res.data)});
  }, [])

  const addProductToCart = () => {
    addProduct(featuredProduct._id);
  }
  
  return (
    <Bg>
        <Center>
            <ColumnsWrapper>
                <Column>
                    {featuredProduct?.images?.length > 0 &&
                        <img src={featuredProduct.images[0]} />}
                </Column>
                <Column>
                    <div>
                        <Title>{featuredProduct.title}</Title>
                        <Desc>{featuredProduct.description}</Desc>
                        <ButtonsWrapper>
                            <ButtonLink href={'/product/'+featuredProduct._id} $outline $white $size='l'>
                                Read more
                            </ButtonLink>
                            <ButtonLink href={''} $primary onClick={addProductToCart}>
                                <CartIcon />
                                Add to cart
                            </ButtonLink>
                        </ButtonsWrapper>
                    </div>
                </Column>
            </ColumnsWrapper>
        </Center>
    </Bg>
  )
}

export default Featured
