import React from 'react'
import { DefaultImage } from '@/app/(Home Routes)/layout'

function ProductCard() {
  return (
    <div className=''>
        <img src={DefaultImage} alt="deafult image" className='w-full'/>
        <div>
            <p>Best Clothe</p>
            <p>5000</p>
        </div>
    </div>
  )
}

export default ProductCard