'use client'
 
import { useParams } from 'next/navigation'
 
export default function Params() {
  const params = useParams()
 
  // Route -> /shop/[tag]/[item]
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
return <h1>{params.id}</h1>
 

}