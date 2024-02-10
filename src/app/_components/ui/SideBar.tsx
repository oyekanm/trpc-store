import { Boxes, LayoutDashboard, UtilityPole, Warehouse } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function SideBar() {
    const home = "admin-dashboard"
    const link = `block text-white flex gap-[1rem] mb-[2rem] text-[2rem] capitalize items-center`
    // route.includes("/products")
    return (
        <div className='bg-slate-700 w-full min-h-screen '>
            <div className='text-center py-[20px] border-gray-500 border-b-[1px]'>
                <p className='text-white text-[2rem] font-semibold'>fashion store</p>
            </div>
            <ul className='py-8 px-4'>
                <Link href={`/${home}`} className={link}>
                    <LayoutDashboard />
                    <li>
                        overview
                    </li>
                </Link>
                <Link href={`/${home}/products`} className={link}>
                    <Warehouse />
                    <li>
                        Products
                    </li>

                </Link>
                <Link href={`/${home}/utilities`} className={link}>
                <UtilityPole />
                    <li>
                        Utility helpers
                    </li>

                </Link>
                <Link href={`/${home}/collections`} className={link}>
                <Boxes />
                    <li>
                        Collections
                    </li>

                </Link>
                <Link href={`/${home}/collections`} className={link}>
                <Boxes />
                    <li>
                        Orders
                    </li>

                </Link>
                <Link href={`/${home}/collections`} className={link}>
                <Boxes />
                    <li>
                        Transactions
                    </li>

                </Link>
                {/* <Link href={`${home}/`} className={link}>
                    Product
                </Link> */}
            </ul>
        </div>
    )
}

export default SideBar