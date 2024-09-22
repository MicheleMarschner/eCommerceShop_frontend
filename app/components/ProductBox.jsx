import React, { useContext } from 'react'
import styled from 'styled-components'
import ButtonStyle from '../styles/Button'
import Link from 'next/link'
import { CartContext } from './CartContext'

const ProductWrapper = styled.div`
    padding: 3rem;
`

const WhiteBox = styled(Link)`
    background-color: #fff;
    padding: 1rem;
    height: 9rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
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

const Title = styled(Link)`
    font-weight: normal;
    font-size: .9rem;
    color: inherit;
    text-decoration: none;
    margin: 0;
`

const ProductInfoBox = styled.div`
    margin-top: 5px;
`

const PriceRow = styled.div`
    display: block;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;

    @media (min-width: 768px) {
        display: flex;
        gap: 2rem;
    }
`

const Price = styled.div`
    font-size: 1rem;
    font-weight: 400;
    text-align: right;

    @media (min-width: 768px) {
        font-size: 1.3rem;
        font-weight: 600;
        text-align: left;
    }
`


const ProductBox = ({_id, title, description, price, images}) => {
  const {addProduct} = useContext(CartContext)
  const url = '/product/'+_id;  
  return (
    <ProductWrapper>
        <WhiteBox href={url}>
            <img src={images?.[0]} />
        </WhiteBox>
        <ProductInfoBox>
            <Title href={url}>{title}</Title>
            <PriceRow>
                <Price>
                    ${price}
                </Price>
                <ButtonStyle $primary $block $outline onClick={() => addProduct(_id)}>
                    Add to Cart
                </ButtonStyle>
            </PriceRow>
                
        </ProductInfoBox>
    </ProductWrapper> 
  )
}

export default ProductBox
