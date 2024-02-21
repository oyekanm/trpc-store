"use client"

import FormReuseable from '@/app/_components/FormReuseable'
import HeaderCard from '@/app/_components/headerCard'
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

    // Trpc query calls
    const { data } = api.cc.getCollectionType.useQuery()
    const { data: getProduct, refetch: getSingleProduct, isLoading: productLoading } = api.product.getSingleProduct.useQuery({ id: productId })

    // TRpc mutation calls
    const { mutate: updateProduct } = api.product.updateProduct
        .useMutation({
            onSuccess(data) {
                getSingleProduct()
                setProductInfo({
                    id: data.id,
                    title: data.title
                })
                Toast({ title: `${data.title} updated successfully!!` })
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
    const { mutate: createImage } = api.image.createImage.useMutation({
        onSuccess(data) {
            setImageId(data.id)
            setImageOpen(true)
            getSingleProduct()
            setImageProps({color:""})
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
            setProductInfo({
                id: getProduct.id,
                title: getProduct.title
            })
        }
    }, [getProduct])

    
    const addProduct = async () => {
        updateProduct({
            id:productInfo.id,
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
    const addimageUrl = async (image: Image[]) => {
        createImageUrl(image)
    }
    const addMoreImage = (id:string)=>{
        setImageOpen(true)
        setImageId(id)
    }



    return (
        <div>
            <section className='p-8'>
            <HeaderCard btnTitle='Back to Products Page' text={`Edit product ${getProduct?.title ?? ""}`} href='/admin-dashboard/products' />

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
                    getSingle={getSingleProduct}
                />}
            </section>
        </div>
    )
}
