"use client";

import React, { useContext, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import Center from '../styles/Center'
import { CartContext } from './CartContext'
import BarsIcon from './icons/BarsIcon';
import { base } from '../lib/styles';

const StyledHeader = styled.header`
    background-color: ${base};
    padding: 
`

const Logo = styled(Link)`
    color: #fff;
    text-decoration: none;
    position: relative;
    z-index: 10002;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.3rem 0;
`

const StyledNav = styled.nav`
    ${props => props.mobileNavActive ? `
        display: block;
    ` : `
        display: none;
    `}
    
    gap: 1rem;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 70px 20px 20px;
    background-color: ${base};
    z-index: 10001;

    @media (min-width: 768px) {
        display: flex;
        position: static;
        padding: 0;
    }
`

const NavLink = styled(Link)`
    display: block;
    color: #aaa;
    text-decoration: none;
    padding: 10px 0;

    @media (min-width: 768px) {
        padding: 0;
    }
`

const NavButton = styled.button`
    background-color: transparent;
    color: white;
    width: 40px;
    height: 40px;
    border: 0;
    cursor: pointer;
    position: relative;
    z-index: 10002;

    @media (min-width: 768px) {
        display: none;
    }
`;

function Header() {
  const {cartProducts} = useContext(CartContext)  
  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <StyledHeader>
        <Center>
            <Wrapper>
                <Logo href={'/'}>Ecommerce</Logo>
                <StyledNav mobileNavActive={mobileNavActive}>
                    <NavLink href={'/'}>Home</NavLink>
                    <NavLink href={'/products'}>Products</NavLink>
                    <NavLink href={'/categories'}>Categories</NavLink>
                    <NavLink href={'/account'}>Account</NavLink>
                    <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
                </StyledNav>
                <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
                    <BarsIcon />
                </NavButton>
            </Wrapper>
        </Center>
    </StyledHeader>
  )
}

export default Header
