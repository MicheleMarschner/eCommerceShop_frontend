import React from 'react'
import styled from 'styled-components'
import ProductBox from './ProductBox'

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`

function ProductsGrid({products}) {
  return (
    <StyledProductsGrid>
        {products.map(product => (
           <ProductBox key={product._id} {...product} />
        ))}
    </StyledProductsGrid>
  )
}

export default ProductsGrid
