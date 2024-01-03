import Table from '@/app/_components/ui/table'
import Link from 'next/link'
import React from 'react'

export default function page() {
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
            <Table />
            </section>
        </div>
    )
}

