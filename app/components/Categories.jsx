"use client";

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Center from '../styles/Center';
import styled from 'styled-components'
import Slider from './Slider';
import Link from 'next/link';


const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`

const ProductWrapper = styled.div`
    padding: 2.4rem;
`

const WhiteBox = styled(Link)`
    background-color: #fff;
    padding: 1rem;
    height: 9rem;
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    text-decoration: none;
    color: inherit;
    img {
        max-width: 100%;
        max-height: 5rem;
    }
`

const CategoryTitle = styled.div`
    font-weight: normal;
    font-size: .9rem;
    margin: 0;
  `


const Categories = () => {
  
  const [ categories, setCategories ] = useState([])

  useEffect(() => {
    axios.get('/api/categories/', 
        { next: { revalidate: 1*360*24}}
      )
      .then(res => setCategories(res.data));
  }, [])
  
  return (
    <Center>
      <Title>Categories</Title>
      <Slider>
        {categories.map(category => (
            <ProductWrapper>
                <WhiteBox href={`/products?category=${category.name}`}>
                    <img src={category.imageUrl} />
                    <CategoryTitle>{(category.name).charAt(0).toUpperCase() + (category.name).slice(1).toLowerCase()}</CategoryTitle>
                </WhiteBox>
            </ProductWrapper> 
        ))}
      </Slider> 
    </Center>
  )
}

export default Categories
