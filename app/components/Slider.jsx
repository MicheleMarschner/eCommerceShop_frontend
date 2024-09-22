import React from 'react'

import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1800 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1799, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1023, min: 768 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
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
