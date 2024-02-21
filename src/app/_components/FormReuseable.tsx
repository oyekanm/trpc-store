"use client"

import Dropdown from '@/app/_components/ui/dropdown'
import { Button } from '@/components/ui/button'
import { UploadDropzone } from '@/libs/uploadthing'
import "@uploadthing/react/styles.css";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogClose, } from '@/components/ui/dialog'
import { ChevronDown, Loader2, Plus, Upload } from 'lucide-react'
import React, { useState } from 'react'
import { CarouselSize } from './ui/carouselImage';
import { api } from '@/trpc/react';
import Toast from './ui/toast';

interface input {
    id: number,
    label: string,
    type: string,
    placeholder: string,
    name: string
}

type image = {
    color: string;
    createdAt: string
    file: { url: string; key: string; imageId: string; id: string }[]
    id: string
    productId: string
    updatedAt: string
}

interface ProductData {
    CollectionType: { name: string };
    collectionTypeId: string;
    createdAt: string;
    currency: string;
    description: string;
    id: string;
    image: image[];
    price: number;
    title: string;
    updatedAt: string;
    uploadStatus: string
}

type Props = {
    uploaded: boolean;
    inputs: input[];
    colorInput?: input[];
    changeProduct: (e: React.ChangeEvent<HTMLInputElement>) => void
    changeColor?: (e: any) => void
    uploadFirst: () => void;
    id?: string,
    data: any,
    dropDownSet: (item: string) => void,
    imageUpload?: () => void,
    imageOpen: boolean;
    setImageOpen: (item: boolean) => void;
    product: any;
    imageProp: any;
    fileUpload: (item: any) => void;
    imageId: string;
    productData?: ProductData | null;
    collectionId: string,
    addMore: (id: string) => void;
    getSingle: () => void
}

type ImageRes = {
    url: string;
    key: string;
    imageId: string
}


// Reusable form component 
export default function FormReuseable(props: Props) {
    const [isEditing, setIsEditing] = useState(false)
    const [imagesId, setImagesId] = useState("")
    const { inputs, uploaded, changeProduct, uploadFirst, getSingle, id, data, dropDownSet, imageUpload, changeColor, colorInput, imageOpen, imageProp, product, setImageOpen, fileUpload, imageId, collectionId, productData, addMore } = props
    const [image, setImage] = useState<ImageRes[]>([])

    const editColor = (id: string, color: string) => {
        setIsEditing(true)
        setImagesId(id)
        // [e.target.name]: e.target.value
        const events = {
            target: {
                name: "color",
                value: color
            }
        }
        changeColor && changeColor(events)
    }

    const { mutate } = api.image.updateImage.useMutation({
        onSuccess(data) {
            // console.log(data)
            setIsEditing(false)
            getSingle()
            setImagesId("")
            Toast({ title: `${data.color} updated successfully!!` })
            const events = {
                target: {
                    name: "color",
                    value: ""
                }
            }
            changeColor && changeColor(events)
            // Toast({ title: `${data.title} deleted successfully!!` })
        },
    })
    const { mutate: deleteImageColor, isLoading } = api.image.deleteImage.useMutation({
        onSuccess(data) {
            // console.log(data)
            getSingle()
            // Toast({ title: `${data.color} updated successfully!!` })
            Toast({ title: `${data.color} deleted successfully!!` })
        },
    })


    // console.log(collectionId)
    return (
        <div className='shadow-[0px_2px_10px_5px_rgba(201,201,201,0.47)] rounded-[.5rem] mt-[3rem]'>
            <div className='md:flex p-8 px-[3rem] gap-[3rem]'>
                <div className='flex-[3] items-center'>
                    {/* porduct inputs */}
                    {inputs.map((input) => {
                        // console.log(product[input.name],input)
                        return (
                            <div className="flex flex-col gap-4 mb-4" key={input.id}>
                                <label className='font-semibold text-[2rem] '>{input.label}</label>
                                <input className='border-b-2 border-gray-300 text-[1.8rem]  focus-visible:outline-none'
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    name={input.name}
                                    onChange={(e) => changeProduct(e)}
                                    value={product[input.name]}
                                />
                            </div>
                        )
                    })}
                    {/* select dropdown component */}
                    <Dropdown
                        btnTitle='pick a collection-type'
                        emptyText='There are no collection-type at the moment'
                        data={data}
                        setFunction={dropDownSet}
                        defaultValue={collectionId}
                    />
                    {/* <button onClick={uploadFirst} className='send-btn mt-4'>Send</button> */}
                    <Button onClick={uploadFirst} className='font-semibold text-[1.8rem] p-8 mt-8' variant={'secondary'} size={"lg"}>Send</Button>

                </div>

                {/* product Image upload */}
                <div className='flex-[6]'>
                    {!uploaded ?
                        // show a placeholder for an upload
                        <div className='flex flex-col items-center gap-8 justify-center h-full'>
                            <img className='rounded-[50%] h-[150px] w-[150px] ' src=" https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" alt="no-image" />
                            <p className='text-[3rem] font-bold capitalize text-gray-400'>add the product to add an image</p>
                        </div> :
                        // show the image upload component
                        <div className='flex flex-col gap-8'>
                            <div>
                                <p className='text-[2rem] font-bold flex gap-4 items-center'>Upload Image <Upload /></p>
                            </div>
                            <div>
                                {colorInput?.map((input) => (
                                    <div className="flex flex-col gap-4 mb-4" key={input.id}>
                                        <label className='font-semibold text-[2rem] '>{input.label}</label>
                                        <input className='border-b-2 border-gray-300 text-[1.8rem]  focus-visible:outline-none'
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            name={input.name}
                                            onChange={(e) => changeColor && changeColor(e)}
                                            value={imageProp[input.name]}
                                        />
                                    </div>
                                ))}
                            </div>
                            <Button onClick={() => {
                                if (isEditing) {
                                    mutate({ color: imageProp.color, id: imagesId })
                                } else {
                                    imageUpload && imageUpload()
                                }
                            }} variant={'secondary'} className='font-semibold text-[1.8rem] p-8' size={"lg"}>Send</Button>

                            <article>
                                {
                                    productData?.image.map(img => {
                                        return <div key={img.id} >
                                            <div className='p-[1rem] flex items-center gap-8'>
                                                <p className='text-[2rem] font-bold capitalize flex items-center'>
                                                    {img.color}
                                                    <DropdownMenu >
                                                        <DropdownMenuTrigger asChild>
                                                            <Button disabled={img.id === imagesId} variant="ghost" className="h-8 w-8 p-0 " size="icon">
                                                                <span className="sr-only">Open menu</span>
                                                                <ChevronDown size={16} color="#000" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-[200px] p-4">

                                                            {/* <DropdownMenuSeparator /> */}
                                                            <DropdownMenuItem onClick={() => editColor(img.id, img.color)} >
                                                                <span className="text-[1.5rem] p-2 font-medium capitalize" >Edit</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() =>{
                                                                 deleteImageColor({ id: img.id })
                                                                 setImagesId(img.id)
                                                            }}>
                                                                <span className="text-[1.5rem] p-2 font-medium capitalize">Delete </span>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </p>
                                                <Button onClick={() => addMore(img.id)} variant="outline" size="icon">
                                                    <Plus size={10} color="#000" />
                                                </Button>
                                                {isLoading && img.id === imagesId && <div className='flex items-center justify-center'>
                                                    <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
                                                </div>}
                                            </div>
                                            <div >
                                                {img.file.length > 0 &&
                                                    <CarouselSize files={img.file} refetch={getSingle} />
                                                }
                                                {/* <Button onClick={() => addMore(img.id)} variant={'secondary'}>{img.file.length > 0 ? "Add more" : "Add Image"}</Button> */}
                                            </div>
                                        </div>
                                    })
                                }
                            </article>
                        </div>}

                </div>
            </div>
            <Dialog open={imageOpen} onOpenChange={() => setImageOpen(false)}>
                <DialogContent className='h-[60%] max-w-[600px]'>
                    <DialogHeader className='text-left'>
                        <DialogTitle className='text-[2rem]'>Upload your image</DialogTitle>
                        <DialogDescription className='text-[1.6rem]'>
                            Upload image based on the color <span className='text-[1rem] font-bold'>(max to upload once is 5)</span>
                        </DialogDescription>
                        <div className={`flex justify-start w-full h-[50%] !mt-[2rem]`}>
                            <UploadDropzone
                                className='w-full rounded-[5px]'
                                endpoint="imageUploader"
                                onClientUploadComplete={(res: any) => {
                                    // Do something with the response
                                    if (res) {
                                        const newImage = res.map((r: any) => {
                                            return {
                                                // name: r.name,
                                                url: r.url,
                                                key: r.key,
                                                imageId: imageId
                                            }
                                        })
                                        fileUpload(newImage)
                                        setImage([...newImage, ...image])

                                        // console.log("Files: ", newImage);
                                    }
                                    // console.log(image);
                                    // setIsUploading(false);
                                    // alert("Upload Completed");
                                }}
                                onUploadError={(error: Error) => {
                                    // Do something with the error.
                                    console.log(`ERROR! ${error.message}`);
                                }}
                            />
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}
