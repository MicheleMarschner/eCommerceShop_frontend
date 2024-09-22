"use client";

import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header';
import Center from '../styles/Center';
import ProductsGrid from '../components/ProductsGrid';
import { useSearchParams, useRouter } from 'next/navigation';
import StyledButton from '../styles/Button';

const Title = styled.h1`
    font-size: 1.5rem;
`

const FilterRow = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.7rem;
    margin-top: 1.7rem;
`

function ProductsPage() {
 
  const searchParams = useSearchParams();
  let category = searchParams.get('category');
  const router = useRouter();

  const goBack = () => {
    router.push('/products')
  }

  return (
    <>
      <Header />
      <Center>
        <Title>Products</Title>
        <FilterRow>
          <StyledButton 
            $outline $black 
            onClick={() => goBack()}
            disabled={!category}  // Disable if category is null or empty
            $disabled={!category}  // Custom prop to style the button when disabled
          >
            Reset Filter
          </StyledButton>
        </FilterRow>
        <ProductsGrid category={category}/>
      </Center>
    </>
  )
}

export default ProductsPage
