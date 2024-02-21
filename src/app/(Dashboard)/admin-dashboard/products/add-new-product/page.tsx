"use client"

import FormReuseable from '@/app/_components/FormReuseable'
import Toast from '@/app/_components/ui/toast'
import { productImageId, productInfoObject } from '@/app/_state/atom/ProductState'
import { productInputs, imageInputs } from '@/libs/formInputs'
import { db } from '@/server/db'
import { api } from '@/trpc/react'
// import { api } from '@/trpc/server'
import React, { useEffect, useState } from 'react'
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
    const [imageOpen, setImageOpen] = useState(false)

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
    // Trpc query and get calls
    const { data } = api.cc.getCollectionType.useQuery()
    const { data: getProduct, refetch: getSingleProduct } = api.product.getSingleProduct.useQuery({ id: productInfo.id })

    // Trpc mutation calls
    const { mutate: createProduct } = api.product.createProduct
        .useMutation({
            onSuccess(data) {
                setUploadProduct(true)
                setProductInfo({
                    id: data.id,
                    title: data.title
                })
                setProduct({
                    title: "",
                    description: "",
                    price: 0,
                    currency: "",
                })
                Toast({ title: `${data.title} created successfully!!` })
            },
            onError(error) {
                if (error?.data?.zodError?.fieldErrors) {
                    for (const [key, value] of Object.entries(error?.data?.zodError?.fieldErrors)) {
                        console.log(`${key}: ${value}`);
                        Toast({ title: `${key}`, description: `${value}` })
                    }


                }
            }
        })
    // console.log(error)
    const { mutate: createImage } = api.image.createImage.useMutation({
        async onSuccess(data) {
            setImageId(data.id)
            setImageOpen(true)
            getSingleProduct()
            const prod = await db.product.findFirst({
                where: {
                    id: productInfo.id
                },
            })
            console.log(prod)
            console.log("first")
            Toast({ title: `Image info created successfully!!`, description: "You can now upload you images" })
        },
        onError(error) {
            // console.log(error.data)
            if (error?.data?.zodError?.fieldErrors) {
                for (const [key, value] of Object.entries(error?.data?.zodError?.fieldErrors)) {
                    console.log(`${key}: ${value}`);
                    Toast({ title: `${key}`, description: `${value}`, variant: "destructive" })
                }


            }
        }
    })
    const { mutate: createImageUrl } = api.image.createImageUrl.useMutation({
        onSuccess(data) {
            getSingleProduct()
            Toast({ title: `Image updated Successfully` })
            // console.log("image done", data)
        },
        onError(error) {
            console.log(error.data)
            // if(error?.data?.zodError?.fieldErrors){
            //     for (const [key, value] of Object.entries(error?.data?.zodError?.fieldErrors)) {
            //         console.log(`${key}: ${value}`);
            //         Toast({title:`${key}`,description:`${value}`})
            //       }


            // }
        }
    })

    // get info of the product created to aid with creating images for the product
    useEffect(() => {
        getSingleProduct()
    }, [productInfo])

    // create a Product
    const addProduct = async () => {
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
        createImage({
            color: imageProps.color,
            productId: productInfo.id
        })
    }
    // update the image with the url from the cloud
    const addimageUrl = async (image: Image[]) => {
        // console.log("started");
        createImageUrl(image)
    }
    // function to open a modal to upload images
    const addMoreImage = (id: string) => {
        setImageOpen(true)
        setImageId(id)
    }


    // console.log(data)

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
                    imageOpen={imageOpen}
                    setImageOpen={setImageOpen}
                    product={product}
                    imageProp={imageProps}
                    fileUpload={addimageUrl}
                    imageId={imageId}
                />
            </section>
        </div>
    )
}
