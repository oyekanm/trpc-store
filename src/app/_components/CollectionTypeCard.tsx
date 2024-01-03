import { DefaultImage } from '@/app/layout'
import React from 'react'

function CollectionTypeCard() {
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

export default CollectionTypeCard