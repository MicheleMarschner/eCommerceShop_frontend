import React from 'react'

import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1500 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1500, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

function Slider({children}) {
  return (
    <Carousel responsive={responsive}>
        {children}
    </Carousel> 
  )
}

export default Slider
