import React from 'react'
import styled, { css } from 'styled-components'

import { poppins, primary } from '../lib/styles'


export const ButtonStyle = css`
  font-size: .8rem;
  font-weight: 500;
  font-family: ${poppins.style.fontFamily};
  align-items: center;
  border: 0;
  padding: 5px 1rem;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  text-decoration: none; 
  max-width: 150px;
  
  ${props => props.$block && css`
    display: block;
    width: 100%;
    max-width: 100vw;
  `}
  ${props => props.$white && !props.$outline && css`
      background-color: #fff;
      color: #000;
  `}
  ${props => props.$white && props.$outline && css`
      font-weight: 600;
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
  `}
  ${props => props.$black && !props.$outline && css`
    background-color: #000;
    color: #fff;
  `}
  ${props => props.$black && props.$outline && css`
    font-weight: 600;
    background-color: transparent;
    color: #000;
    border: 1px solid #000;
  `}
  ${props => props.$primary && !props.$outline && css`
      font-weight: 600;
      background-color: ${primary};
      color: #fff;
      border: 1px solid ${primary};
  `}
  ${props => props.$primary && props.$outline && css`
      background-color: transparent;
      color: ${primary};
      border: 1px solid ${primary};
  `}
  ${props => props.$size === 'l' && css`
      font-size: 1.2rem;
      padding: 0.8rem 1.2rem;
      svg {
        height: 1.2rem;
      }
  `}
  ${props => props.$disabled && css`
    font-weight: 600;
    background-color: transparent;
    color: #c8c8c8;
    border: 1px solid #c8c8c8;
    cursor: default;
  `}
`

const StyledButton = styled.button`
  ${ButtonStyle}
`

function Button({children, ...rest}) {
  return (
    <StyledButton {...rest}>
      {children}
    </StyledButton>
  )
}

export default Button
