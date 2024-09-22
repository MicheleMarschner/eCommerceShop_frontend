"use client";

import React from 'react'
import Categories from '../components/Categories'
import Header from '../components/Header'
import Center from '../styles/Center'

function CategoriesPage() {
  return (
    <>
    <Header />
      <Center>
    <Categories />
    </Center>
    </>
  )
}

export default CategoriesPage
