import Dropdown from '@/app/_components/ui/dropdown'
import { UploadDropzone } from '@/libs/uploadthing'
import React from 'react'

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
    imageUpload?: () => void
}


// Reusable form component 
export default function FormReuseable(props: Props) {
    const { inputs, uploaded, changeProduct, uploadFirst, id, data, dropDownSet, imageUpload, changeColor, colorInput } = props
    return (
        <div className='shadow-[0px_2px_10px_5px_rgba(201,201,201,0.47)] rounded-[.5rem] mt-[3rem]'>
            <div className='md:flex p-8 px-[3rem] gap-[3rem]'>
                <div className='flex-[3] items-center'>
                    {/* porduct inputs */}
                    {inputs.map((input) => (
                        <div className="flex flex-col gap-4 mb-4" key={input.id}>
                            <label className='font-bold text-[2rem] '>{input.label}</label>
                            <input className='border-b-2 border-gray-300 text-[1.8rem]  focus-visible:outline-none'
                                type={input.type}
                                placeholder={input.placeholder}
                                name={input.name}
                                onChange={(e) => changeProduct(e)}
                            />
                        </div>
                    ))}
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
                                {colorInput?.map((input) => (
                                    <div className="flex flex-col gap-4 mb-4" key={input.id}>
                                        <label className='font-bold text-[2rem] '>{input.label}</label>
                                        <input className='border-b-2 border-gray-300 text-[1.8rem]  focus-visible:outline-none'
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            name={input.name}
                                            onChange={(e) => changeColor && changeColor(e)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col md:flex-row gap-4 mb-4" >
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
                                    {/* <div className={`flex justify-start`}>
          <UploadDropzone<OurFileRouter>
            endpoint="imageUploader"
            onClientUploadComplete={(res:any) => {
              // Do something with the response
              if(res){
              const newImage =  res.map((r:any)=>{
                  return{
                    id:r.fileKey,
                    url:r.fileUrl
                  }
                })
                setImage([...newImage,...image])
               
              }
              console.log("Files: ", res);
              console.log(image);
              setIsUploading(false);
              // alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              console.log(`ERROR! ${error.message}`);
            }}
          />
        </div> */}
                                </div>
                            </div>
                            <button onClick={imageUpload} className='send-btn mt-4'>Send</button>
                        </div>}

                </div>
            </div>

        </div>
    )
}
