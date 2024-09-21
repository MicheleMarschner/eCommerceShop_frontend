import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Center from '../styles/Center';
import styled from 'styled-components'
import ProductBox from './ProductBox';
import Slider from './Slider';

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`


const NewProducts = () => {
  const [ sortedProducts, setSortedProducts ] = useState([])

  useEffect(() => {

    axios.get('/api/products/sortedProducts', 
        { next: { revalidate: 1*360*24}}
      )
      .then(res => setSortedProducts(res.data));
  }, [])
  
  return (
    <Center>
      <Title>New Arrivals</Title>
      <Slider>
        {sortedProducts.map(product => (
           <ProductBox key={product._id} {...product} />
        ))}
      </Slider>
    </Center>
  )
}

export default NewProducts
