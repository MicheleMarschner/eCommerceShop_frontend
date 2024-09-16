"use client";

import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import styled from 'styled-components'
import Center from '../styles/Center';
import Button from '../styles/Button';
import { CartContext } from '../components/CartContext';

import axios from 'axios';
import Table from '../components/Table';
import Input from '../components/Input';

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.3rem;
    margin-top: 2.3rem;

    @media screen and (min-width: 768px) {
        grid-template-columns: 1.2fr .8fr;
    }
` 

const WhiteBox = styled.div`
    background-color: #fff;
    border-radius: 0.7rem;
    padding: 1.8rem;
`

const ProductInfoCell = styled.td`
    padding: 10px 0;
`

const ProductImageBox = styled.div`
    width: 4.3rem;
    height: 6.25rem;
    padding: 2px;
    border: 1px solid rgba(0,0,0,.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;

    img {
        max-width: 3.75rem;
        max-height: 3.75rem;
    }

    @media screen and (min-width: 768px) {
        padding: 10px;
        width: 6.25rem;
        height: 6.25rem;

        img {
            max-width: 5rem;
            max-height: 5rem;
        }
    }
`;

const QuantityLabel = styled.span`
    padding: 0 3px;
    display: block;
    padding-left: 15px;
    @media screen and (min-width: 768px) {
        display: inline-block; 
        min-width: 35px; 
        padding: 0;
        text-align: center;
    }
`;

const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`

function CartPage() {
  const {cartProducts, addProduct, removeProduct, clearCart} = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (window.location.href.includes('success')) {
        setIsSuccess(true)
        clearCart()
    }
  }, [])
    
  useEffect(() => {
    if (cartProducts?.length > 0) {
        axios.post('/api/cart', {ids: cartProducts})
            .then(res => {
                setProducts(res.data)
            })
    }
    else {
        setProducts([])
    }
  }, [cartProducts])

  const increaseProductQuantity = (id) => {
    addProduct(id)
  }

  const decreaseProductQuantity = (id) => {
    removeProduct(id)
  }

  const goToPayment = async () => {
    const res = await axios.post('/api/checkout', {
        name, email, city, postalCode, streetAddress, country, cartProducts
    })
    if (res.data.url) {
        window.location = res.data.url;
    }
  }

  let total = 0;
  for (const productId of cartProducts)
  {
    const price = products.find(p => p._id === productId)?.price  || 0;
    total += price;
  }
  
  if(isSuccess) {
    return (
        <>
            <Header />
            <Center>
                <ColumnsWrapper>
                    <WhiteBox>
                        <h1>Thanks for your order!</h1>
                        <p>We will email you when your order will be sent.</p>
                    </WhiteBox>
                </ ColumnsWrapper>
            </ Center>
        </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
            <WhiteBox>
                <h2>Cart</h2>
                {!cartProducts?.length && (
                    <div>Your cart is empty</div>
                )}
                {products?.length > 0 && (
                    <Table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>     
                            {products.map(product => (
                                <tr>
                                    <ProductInfoCell>
                                        <ProductImageBox>
                                            <img src={product.images?.[0]} />
                                        </ProductImageBox>
                                        {product.title}
                                    </ProductInfoCell>
                                    <td>
                                        <Button onClick={() => decreaseProductQuantity(product._id)}>-</Button>
                                        <QuantityLabel>
                                            {cartProducts.filter(id => id === product._id).length}
                                        </QuantityLabel>
                                        <Button onClick={() => increaseProductQuantity(product._id)}>+</Button>
                                    </td>
                                    <td>${cartProducts.filter(id => id === product._id).length * product.price}</td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td></td>
                                <td>${total}</td>
                            </tr>
                        </tbody>
                    </Table>
                )}
            </WhiteBox>
            {!!cartProducts?.length && (
                <WhiteBox>
                    <h2>Order information</h2>
                    <Input 
                        type="text" 
                        placeholder='Name' 
                        value={name} 
                        name='name'
                        onChange={e => setName(e.target.value)} 
                    />
                    <Input 
                        type="text" 
                        placeholder='Email' 
                        value={email} 
                        name='email'
                        onChange={e => setEmail(e.target.value)}
                    />
                    <CityHolder>
                        <Input 
                            type="text" 
                            placeholder='City' 
                            value={city}
                            name='city' 
                            onChange={e => setCity(e.target.value)}
                        />
                        <Input 
                            type="text" 
                            placeholder='Postal Code' 
                            value={postalCode} 
                            name='postalCode'
                            onChange={e => setPostalCode(e.target.value)}
                        />
                    </CityHolder>
                    <Input 
                        type="text" 
                        placeholder='Street Address' 
                        value={streetAddress} 
                        name='streetAddress'
                        onChange={e => setStreetAddress(e.target.value)}
                    />
                    <Input 
                        type="text" 
                        placeholder='Country' 
                        value={country} 
                        name='country'
                        onChange={e => setCountry(e.target.value)}
                    />
                    <Button $block $primary onClick={goToPayment}>Continue to payment</Button>
                </WhiteBox>
            )}
        </ColumnsWrapper>
      </Center>
    </>
  )
}

export default CartPage
