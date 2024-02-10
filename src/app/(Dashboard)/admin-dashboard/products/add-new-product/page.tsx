"use client"

import FormReuseable from '@/app/_components/FormReuseable'
import { productImageId, productInfoObject } from '@/app/_state/atom/ProductState'
import { productInputs, imageInputs } from '@/libs/formInputs'
import { api } from '@/trpc/react'
// import { api } from '@/trpc/server'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'

type Image = {
    url: string;
    id: string;
    key: string
}

export default function page() {

    const [imageId, setImageId] = useRecoilState(productImageId);
    const [productInfo, setProductInfo] = useRecoilState(productInfoObject);
    const [images, setImages] = useState<Image[]>([])
    const [collectionTypeId, setCollectionTypeId] = useState("")
    const [uploadProduct, setUploadProduct] = useState(false)
    const [toastOpen, setToastOpen] = useState(false)

    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: 0,
        currency: "",
    })
    const [imageProps, setImageProps] = useState({
        color: ""
    })

    const setProductInfos = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value, e.target.name)
        setProduct(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })

    }
    const setImageProperty = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value, e.target.name)
        setImageProps(prev => {
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
                setProductInfo({
                    id: data.id,
                    title: data.title
                })
                setToastOpen(true)
            },
        })
    const { mutate: createImage } = api.image.createImage.useMutation({
        onSuccess(data) {
            setImageId(data.id)
            console.log("image done", data)
        }
    })

    const { data } = api.cc.getCollectionType.useQuery()

    const addProduct = async () => {
        // console.log("started");

        createProduct({
            title: product.title,
            description: product.description,
            price: Number(product.price),
            collectionTypeId: collectionTypeId,
            currency: product.currency
        })
    }
    // add image to DB
    const addColor = async () => {
        // console.log("started");
        createImage({
            color: imageProps.color,
            productId: productInfo.id
        })
    }


    console.log(productInfo)

    return (
        <div>
            <section className='p-8'>
                <div className='p-4 shadow-[2px_4px_10px_1px_rgba(201,201,201,0.47)] rounded-[.5rem]'>
                    <p className='text-[2rem] color-primary capitalize '>add new product</p>
                </div>

                {/* show toast on mutation success */}
                {/* {toastOpen ? <Toast title='Success' description={`${productInfo.title} created successfully!!`}  /> : null} */}

                <FormReuseable
                    inputs={productInputs}
                    uploaded={uploadProduct}
                    changeProduct={setProductInfos}
                    uploadFirst={addProduct}
                    id={productInfo.id}
                    data={data}
                    dropDownSet={setCollectionTypeId}
                    imageUpload={addColor}
                    changeColor={setImageProperty}
                    colorInput={imageInputs}
                />
            </section>
        </div>
    )
}
