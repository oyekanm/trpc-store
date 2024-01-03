import { ChevronDown, Upload } from 'lucide-react'
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
    changeProduct: (e: React.ChangeEvent<HTMLInputElement>)=> void
    uploadFirst: ()=> void
}


// Reusable form component 
export default function FormReuseable(props: Props) {
    const { inputs, uploaded,changeProduct,uploadFirst } = props
    return (
        <div className='shadow-[0px_2px_10px_5px_rgba(201,201,201,0.47)] rounded-[.5rem] mt-[3rem]'>
            <form action="" className='md:flex p-8 px-[3rem] gap-[3rem]'>
                <div className='flex-[3] items-center'>
                    {/* <img
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        /> */}
                    {inputs.map((input) => (
                        <div className="flex flex-col gap-4 mb-4" key={input.id}>
                            <label className='font-bold text-[2rem] '>{input.label}</label>
                            <input className='border-b-2 border-gray-300 text-[1.8rem]  focus-visible:outline-none' 
                            type={input.type} 
                            placeholder={input.placeholder} 
                            name={input.name} 
                            onChange={(e)=>changeProduct(e)}
                            />
                        </div>
                    ))}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn m-1 capitalize">collections <ChevronDown /></div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Item 1</a></li>
                            <li><a>Item 2</a></li>
                        </ul>
                    </div>
                </div>
                <div className='flex-[6]'>

                    {!uploaded ?
                        <div className='flex flex-col items-center gap-8 justify-center h-full'>
                            <img className='rounded-[50%] h-[150px] w-[150px] ' src=" https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" alt="no-image" />
                            <p className='text-[3rem] font-bold capitalize text-gray-400'>add the product to add an image</p>
                        </div> :
                        <div className='flex flex-col gap-8'>

                            <div>
                                <label htmlFor="image">image : <Upload /></label>
                                <input type="file" name="image" id="image" className='hidden' />
                            </div>
                            <div className="flex flex-col md:flex-row gap-4 mb-4" >
                                <input className='border-b-2 border-gray-300 text-[1.8rem]  focus-visible:outline-none' type={"text"} placeholder={"create new color"} />
                                <button>add</button>
                            </div>
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn m-1 capitalize">pick a color <ChevronDown /></div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a>Item 1</a></li>
                                    <li><a>Item 2</a></li>
                                </ul>
                            </div>
                        </div>}

                </div>
            </form>
            <button onClick={uploadFirst}>Send</button>
        </div>
    )
}
