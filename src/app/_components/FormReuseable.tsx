"use client"

import Dropdown from '@/app/_components/ui/dropdown'
import { Button } from '@/components/ui/button'
import { UploadDropzone } from '@/libs/uploadthing'
import "@uploadthing/react/styles.css";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogClose, } from '@/components/ui/dialog'
import { Upload } from 'lucide-react'
import React, { useState } from 'react'

interface input {
    id: number,
    label: string,
    type: string,
    placeholder: string,
    name: string
}

type Props = {
    uploaded: boolean;
    inputs: input[];
    colorInput?: input[];
    changeProduct: (e: React.ChangeEvent<HTMLInputElement>) => void
    changeColor?: (e: React.ChangeEvent<HTMLInputElement>) => void
    uploadFirst: () => void;
    id?: string,
    data: any,
    dropDownSet: (item: string) => void,
    imageUpload?: () => void,
    imageOpen: boolean;
    setImageOpen: (item: boolean) => void;
    product: any;
    imageProp: any;
    fileUpload:(key:string, url:string) => void
}

type ImageRes = {
    url: string;
    key: string;
    name:string,
    size:number;
    serverData:{}
}


// Reusable form component 
export default function FormReuseable(props: Props) {
    const { inputs, uploaded, changeProduct, uploadFirst, id, data, dropDownSet, imageUpload, changeColor, colorInput, imageOpen, imageProp, product, setImageOpen,fileUpload } = props
    const [image,setImage] = useState<{
        url: string;
        key: string;
        name:string
    }[]>([])

    console.log(image)
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
                    />
                    <button onClick={uploadFirst} className='send-btn mt-4'>Send</button>
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
                            {/* <div className="flex flex-col md:flex-row gap-4 mb-4" >
                                <div className={`flex justify-start`}>
                                    <UploadDropzone
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res: any) => {
                                            // Do something with the response
                                            if (res) {
                                                const newImage = res.map((r: any) => {
                                                    return {
                                                        id: r.fileKey,
                                                        url: r.fileUrl
                                                    }
                                                })
                                                // setImage([...newImage, ...image])

                                            }
                                            console.log("Files: ", res);
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
                            </div> */}
                            <Button onClick={imageUpload} variant={'secondary'}>Send</Button>
                        </div>}

                </div>
            </div>
            <Dialog open={imageOpen} onOpenChange={()=>setImageOpen(false)}>
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
                                            fileUpload(r.key, r.url)
                                            return {
                                                name: r.name,
                                                url: r.url,
                                                key: r.key
                                            }
                                        })
                                        setImage([...newImage, ...image])

                                    }
                                    console.log("Files: ", res);
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
