// mark as client component
"use client";
import { Suspense, useEffect, useState } from 'react'
import Header from "./components/Header";
import Featured from "./components/Featured";
import axios from 'axios';
import NewProducts from './components/NewProducts';
import Categories from './components/Categories';

export default function Home() {

  const [ products, setProducts ] = useState([])

  useEffect(() => {
    axios.get('/api/products', 
        { next: { revalidate: 1*360*24}}
      )
      .then(res => setProducts(res.data));
  }, [])



  return (
    <main>
      <Header />
      <Featured />
      <Suspense fallback={<div>Loading</div>}>
      <NewProducts />
      </Suspense>
      <Suspense fallback={<div>Loading</div>}>
      
      <Categories />
      </Suspense>
    </main>
  );
}