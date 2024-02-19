"use client"

import FormReuseable from '@/app/_components/FormReuseable'
import Toast from '@/app/_components/ui/toast'
import { productImageId, productInfoObject } from '@/app/_state/atom/ProductState'
import { imageInputs, productInputs } from '@/libs/formInputs'
import { api } from '@/trpc/react'
import { log } from 'console'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

type Image = {
    url: string;
    id: string;
    key: string
}

type Props = {
    params: { productId: string }
}

export default function page(props: Props) {
    const { params } = props
    const { productId } = params
    const [imageId, setImageId] = useRecoilState(productImageId);
    const [productInfo, setProductInfo] = useRecoilState(productInfoObject);
    const [images, setImages] = useState<Image[]>([])
    const [collectionTypeId, setCollectionTypeId] = useState("")
    const [uploadProduct, setUploadProduct] = useState(true)
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
    const { data } = api.cc.getCollectionType.useQuery()
    const { data: getProduct, refetch: getSingleProduct, isLoading: productLoading } = api.product.getSingleProduct.useQuery({ id: productId })

    console.log(getProduct)
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
        onSuccess(data) {
            setImageId(data.id)
            setImageOpen(true)
            getSingleProduct()
            Toast({ title: `Image info created successfully!!`, description: "You can now upload you images" })
            // console.log("image done", data)
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

    useEffect(() => {
        if (getProduct) {
            setProduct({
                currency: getProduct?.currency,
                description: getProduct?.description,
                price: getProduct?.price,
                title: getProduct?.title
            })
            setCollectionTypeId(getProduct?.collectionTypeId || "")
        }
    }, [getProduct])

    console.log(collectionTypeId)
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
    const addimageUrl = async (image: Image[]) => {
        // console.log("started");
        createImageUrl(image)
    }

    const addMoreImage = (id:string)=>{
        setImageOpen(true)
        setImageId(id)
    }



    return (
        <div>
            <section className='p-8'>
                <div className='p-4 shadow-[2px_4px_10px_1px_rgba(201,201,201,0.47)] rounded-[.5rem]'>
                    <p className='text-[2rem] color-primary capitalize '>Edit product {getProduct?.title}</p>
                </div>
                {productLoading && !getProduct && <div className='flex items-center justify-center mt-[50px]'>
                    <Loader2 className='h-12 w-12 animate-spin text-zinc-800' />
                </div>}

                {!productLoading && getProduct && <FormReuseable
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
                    productData={getProduct}
                    collectionId={collectionTypeId}
                    addMore={addMoreImage}
                />}
            </section>
        </div>
    )
}
