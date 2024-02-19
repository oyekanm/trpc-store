"use client"


import { api } from '@/trpc/react'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function page() {

    const { data, isLoading } = api.product.getProduct.useQuery()
    // const { data} = api.product.getSingleProduct.useQuery({id:"clssq2zet00076cx5nqks7ime"})

    // console.log(data )

    return (
        <div>
            <section className='p-[2rem]'>

                <div className='py-[1rem] flex justify-between'>
                    <span className='color-primary  text-[2rem]'>
                        Add new Product
                    </span>
                    <Link href={`/admin-dashboard/products/add-new-product`}>
                        <span className=' text-[2rem] cursor-pointer'>
                            Add
                        </span>
                    </Link>
                </div>
                {isLoading && <div className='flex items-center justify-center'>
                    <Loader2 className='h-12 w-12 animate-spin text-zinc-800' />
                </div>}
                {
                    // data && (
                    //     // <DataTable />
                    //     // <div className="overflow-x-auto">
                    //     //     <table className="table">
                    //     //         {/* head */}
                    //     //         <thead>
                    //     //             <tr>
                    //     //                 <th>
                    //     //                     <label>
                    //     //                         <input type="checkbox" className="checkbox" />
                    //     //                     </label>
                    //     //                 </th>
                    //     //                 <th>Name</th>
                    //     //                 <th>Price</th>
                    //     //                 <th>Actions</th>
                    //     //                 <th></th>
                    //     //             </tr>
                    //     //         </thead>
                    //     //         <tbody>
                    //     //             {/* row data */}
                    //     //             {
                    //     //                 data.map((d) => {
                    //     //                     return <tr>
                    //     //                         <th>
                    //     //                             <label>
                    //     //                                 <input type="checkbox" className="checkbox" />
                    //     //                             </label>
                    //     //                         </th>
                    //     //                         <td>
                    //     //                             <div className="flex items-center gap-3">
                    //     //                                 <div className="avatar">
                    //     //                                     <div className="mask mask-squircle w-12 h-12">
                    //     //                                         <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                    //     //                                     </div>
                    //     //                                 </div>
                    //     //                                 <div>
                    //     //                                     <div className="font-bold">{d.title}</div>
                    //     //                                     <div className="text-sm opacity-50">{d.CollectionType?.name}</div>
                    //     //                                 </div>
                    //     //                             </div>
                    //     //                         </td>
                    //     //                         <td>
                    //     //                             <span>{d.price}</span>
                    //     //                             <br />
                    //     //                             <span className="badge badge-ghost badge-sm capitalize">naira</span>
                    //     //                         </td>
                                             
                    //     //                         <th>
                    //     //                             <button className="btn btn-ghost btn-xs">details</button>
                    //     //                         </th>
                    //     //                     </tr>
                    //     //                 })
                    //     //             }

                    //     //         </tbody>
                               

                    //     //     </table>

                    //     // </div>

                    // )
                }
                {
                    !data && !isLoading && <div className='flex items-center justify-center mt-12'>
                        <p className='text-[3rem] font-bold capitalize '>No product</p>
                    </div>
                }
            </section>
        </div>
    )
}

