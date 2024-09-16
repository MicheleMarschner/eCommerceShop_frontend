"use client";

import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Header from '../components/Header';
import Center from '../styles/Center';
import ProductsGrid from '../components/ProductsGrid';
import axios from 'axios';

const Title = styled.h1`
    font-size: 1.5rem;
`

function ProductsPage() {
  const [ products, setProducts ] = useState([])


  useEffect(() => {
    axios.get('/api/products', 
        { next: { revalidate: 1*360*24}}
    )
    .then(res => setProducts(res.data));
  }, [])

  return (
    <>
      <Header />
      <Center>
        <Title>All Products</Title>
        <ProductsGrid products={products}/>
      </Center>
    </>
  )
}

export default ProductsPage
