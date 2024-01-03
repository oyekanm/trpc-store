"use client"

import FormReuseable from '@/app/_components/FormReuseable'
import { productInputs } from '@/lib/formInputs'
import { api } from '@/trpc/react'
// import { api } from '@/trpc/server'
import React, { useState } from 'react'

type Image = {
    url: string;
    id: string;
    key: string
}

export default function page() {
    const [images, setImages] = useState<Image[]>([])
    const [uploadProduct, setUploadProduct] = useState(false)
    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: 0
    })

    const setProductInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value, e.target.name)
        setProduct(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })

    }

    // console.log(product);

    const { mutate: createProduct } = api.product.createProduct.useMutation()

    const addProduct = async () => {
        console.log("started");
        
        createProduct(product)
    }

    // .mutate({},{

    // })
    return (
        <div>
            <section className='p-8'>
                <div className='p-4 shadow-[2px_4px_10px_1px_rgba(201,201,201,0.47)] rounded-[.5rem]'>
                    <p className='text-[2rem] color-primary capitalize '>add new product</p>
                </div>
                <FormReuseable
                    inputs={productInputs}
                    uploaded={uploadProduct}
                    changeProduct={setProductInfo}
                    uploadFirst={addProduct} />
            </section>
        </div>
    )
}
