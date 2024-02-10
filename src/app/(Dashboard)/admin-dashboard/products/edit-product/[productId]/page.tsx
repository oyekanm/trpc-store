"use client"

import FormReuseable from '@/app/_components/FormReuseable'
import Toast from '@/app/_components/ui/toast'
import { productInputs } from '@/libs/formInputs'
import { api } from '@/trpc/react'
import React, { useState } from 'react'

type Image = {
    url: string;
    id: string;
    key: string
}

type Props = {
    params:{productId:string}
}

export default function page(props:Props) {
    const {params} = props
    const {productId} = params
    const [images, setImages] = useState<Image[]>([])
    const [collectionTypeId, setCollectionTypeId] = useState("")
    const [uploadProduct, setUploadProduct] = useState(false)
    const [toastOpen, setToastOpen] = useState(false)
    const [productInfos, setProductInfos] = useState({
        title: "",
        id: ""
    })
    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: 0,
        currency:""
    })

    const setProductInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value, e.target.name)
        setProduct(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })

    }


    const { mutate: createProduct } = api.product.createProduct
        .useMutation({
            onSuccess(data) {
                setUploadProduct(true)
                setProductInfos({
                    id: data.id,
                    title: data.title
                })
                setToastOpen(true)
            },
        })

    const { data } = api.cc.getCollectionType.useQuery()

    const addProduct = async () => {
        // console.log("started");

        createProduct({
            title: product.title,
            description: product.description,
            price: Number(product.price),
            collectionTypeId: collectionTypeId
        })
    }

    if(productId !== "11111") return "error";
    
    return (
        <div>
            <section className='p-8'>
                <div className='p-4 shadow-[2px_4px_10px_1px_rgba(201,201,201,0.47)] rounded-[.5rem]'>
                    <p className='text-[2rem] color-primary capitalize '>Edit product {productId}</p>
                </div>

                {/* show toast on mutation success */}
                {toastOpen ? <Toast className='alert-success' text={`${productInfos.title} created successfully!!`} close={() => setToastOpen(false)} /> : null}

                <FormReuseable
                    inputs={productInputs}
                    uploaded={uploadProduct}
                    changeProduct={setProductInfo}
                    uploadFirst={addProduct}
                    id={productInfos.id}
                    data={data}
                    dropDownSet={setCollectionTypeId} />
            </section>
        </div>
    )
}
