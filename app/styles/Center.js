import React from 'react'
import styled from 'styled-components'


const StyledDiv = styled.div`
    max-width: 100vw;
    margin: 0 auto;
    padding: 0 1.3rem;
`


function Center({children}) {
  return (
    <StyledDiv>
      {children}
    </StyledDiv>
  )
}

export default Center
