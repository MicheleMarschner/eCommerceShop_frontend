import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
`;

const BigImage = styled.img`
    max-width: 100%;
    min-height: 100px;
    max-height: 200px;
`

const ImageButtons = styled.div`
    display: flex;
    gap: .7rem;
    flex-grow: 0;
    margin-top: 10px;
`;

const ImageButton = styled.div`
    border: 2px solid #ccc;
    ${props => props.active ? `
        border-color: #ccc;
    ` : `
        border-color: transparent;  
        opacity: .7;    
    `}
    
    height: 2.5rem;
    padding: 2px;
    cursor: pointer;
    border-radius: 5px;
`

const BigImageWrapper = styled.div`
    text-align: center;
`

function ProductImages({images}) {
  const [activeImage, setActiveImage] = useState(images?.[0])

  useEffect(() => {
    setActiveImage(images?.[0])
  }, [images])

  return (
    <>
        <BigImageWrapper>
            <BigImage src={activeImage} alt="" />
            <ImageButtons>
                { images?.map(image => (
                    <ImageButton 
                        key={image}
                        active={image===activeImage} 
                        onClick={() => setActiveImage(image)}
                    >
                        <Image src={image} alt="" />
                    </ImageButton>
                ))}
            </ImageButtons>
        </BigImageWrapper>
    </>
  )
}

export default ProductImages
