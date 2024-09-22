import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import ProductBox from './ProductBox'
import axios from 'axios'

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 768px) and (max-width: 1199px) { 
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) and (max-width: 1799px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media (min-width: 1800px) { 
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin: 0 4rem;
  }

`

function ProductsGrid({category}) {
  const [ products, setProducts ] = useState([])

  useEffect(() => {
    axios.get(`/api/products?category=${category}`, 
      { next: { revalidate: 1*360*24}}
    )
    .then(res => setProducts(res.data));
  }, [category])

  return (
    <>
      <StyledProductsGrid>
        {products.map(product => (
           <ProductBox key={product._id} {...product} />
        ))}
      </StyledProductsGrid> 
    </>
  )
}

export default ProductsGrid
