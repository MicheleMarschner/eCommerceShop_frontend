// mark as client component
"use client";

import GlobalStyles from "./styles/GlobalStyles";
import React from 'react'

function ClientLayout({ children }) {
  return (
    <>
        <GlobalStyles />
        {children}
    </>
  )
}

export default ClientLayout
