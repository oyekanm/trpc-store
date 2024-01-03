"use client"

import FormReuseable from '@/app/_components/FormReuseable'
import { productInputs } from '@/lib/formInputs'
import React, { useState } from 'react'

type Image = {
    url: string;
    id: string;
    key: string
}

export default function page() {
    const [images, setImages] = useState<Image[]>([])
    const [uploadProduct, setUploadProduct] = useState(true)
    return (
        <div>
            <section className='p-8'>
                <div className='p-4 shadow-[2px_4px_10px_1px_rgba(201,201,201,0.47)] rounded-[.5rem]'>
                    <p className='text-[2rem] color-primary capitalize '>add new product</p>
                </div>
                <FormReuseable inputs={productInputs} uploaded={uploadProduct}/>
            </section>
        </div>
    )
}
