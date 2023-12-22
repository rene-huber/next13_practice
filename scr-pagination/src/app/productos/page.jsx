import ProductList from '@/src/components/productList/ProductList'
import React from 'react'

function Products({ searchParams }) {
  return (
    <div><h1>Todos los Products</h1>
    
    <ProductList searchParams={searchParams} />
    
    </div>
  )
}

export default Products