"use client"


import { DataTable } from '@/app/_components/dataTable'
import { api } from '@/trpc/react'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { ProductColumn } from './ProductColumn'
import HeaderCard from '@/app/_components/headerCard'
import Toast from '@/app/_components/ui/toast'

export default function page() {
  

    const { data, isLoading, refetch,dataUpdatedAt } = api.product.getProduct.useQuery()

    console.log(dataUpdatedAt)

    useEffect(()=>{
        refetch()
    },[dataUpdatedAt])

    return (
        <div>
            <section className='p-[2rem]'>
                <HeaderCard btnTitle='Add new Product' text='Products' href='/admin-dashboard/products/add-new-product' />
                {/* <div className='py-[1rem] flex justify-between'>
                    <span className='color-primary  text-[2rem]'>
                        Add new Product
                    </span>
                    <Link href={`/admin-dashboard/products/add-new-product`}>
                        <span className=' text-[2rem] cursor-pointer'>
                            Add
                        </span>
                    </Link>
                </div> */}
                {isLoading && <div className='flex items-center justify-center mt-[50px]'>
                    <Loader2 className='h-12 w-12 animate-spin text-zinc-800' />
                </div>}
                {
                    data && (
                        <div className='mt-12'>
                            <DataTable columns={ProductColumn} data={data} />
                        </div>

                    )
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

