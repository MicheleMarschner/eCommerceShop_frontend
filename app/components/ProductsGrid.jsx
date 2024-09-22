import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import ProductBox from './ProductBox'
import axios from 'axios'

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
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
