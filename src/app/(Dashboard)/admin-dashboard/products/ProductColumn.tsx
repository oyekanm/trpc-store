"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { api } from "@/trpc/react"
import Toast from "@/app/_components/ui/toast"


export type Product = {
    // id: string
    // price: number
    // uploadStatus: "pending" | "processing" | "success" | "failed"
    // title: string
    // currency: string;
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
type image = {
    color: string;
    createdAt: string
    file: { url: string; key: string; imageId: string; id: string }[]
    id: string
    productId: string
    updatedAt: string
}






export const ProductColumn: ColumnDef<Product>[] = [
    
    {
        accessorKey: "title",
        header: () => <span className="text-[1.6rem] font-bold ">Name</span>,
        cell: ({ row }) => {
            const name = row.original.title;

            return <span className=" font-medium text-[1.5rem] capitalize">{name}</span>
          },
    },
    {
        accessorKey: "CollectionType.name",
        header: "Collection-Type",
        cell: ({ row }) => {
          const coll = row.original.CollectionType.name
       
            return <span className=" font-medium text-[1.5rem]">{coll}</span>
          },
    },
    {
        accessorKey: "uploadStatus",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.uploadStatus
       
            return <span className=" font-medium text-[1.5rem] lowercase">{status}</span>
          },
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "NGN",
            }).format(amount)
       
            return <div className=" font-medium text-[1.5rem]">{formatted}</div>
          },
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const payment = row.original
        //   console.log(row.original)

        const {mutate} = api.product.deleteSingleProduct.useMutation({
            onSuccess(data) {
                // console.log(data)
                Toast({ title: `${data.title} deleted successfully!!` })
            },
        })
     
          return (
            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 ">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-12 w-12" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] p-4">
                <DropdownMenuLabel className="text-[1.8rem] pb-4 font-semibold capitalize" >Actions</DropdownMenuLabel>
                {/* <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(payment.id)}
                >
                  Copy payment ID
                </DropdownMenuItem> */}
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuItem >
                    <Link className="text-[1.5rem] p-2 font-medium capitalize" href={`/admin-dashboard/products/edit-product/${payment.id}`}>Edit {payment.title}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>mutate({id:payment.id})}>
                    <span className="text-[1.5rem] p-2 font-medium capitalize">Delete {payment.title}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    
]
