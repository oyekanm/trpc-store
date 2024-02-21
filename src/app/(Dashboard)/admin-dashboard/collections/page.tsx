"use client"

import Dropdown from '@/app/_components/ui/dropdown'
import Toast from '@/app/_components/ui/toast'
import { api } from '@/trpc/react'
import { useState } from 'react'
import { MoreHorizontal } from "lucide-react"
import { Button } from '@/components/ui/button'
import Drawer from '@/app/_components/ui/drawer'

export default function page() {
  const [collection, setCollection] = useState("")
  const [collectionId, setCollectionId] = useState("")
  const [collectionType, setCollectionType] = useState("")
  const [toastOpen, setToastOpen] = useState(false)
  const [ccName, setCcName] = useState("")

  const { data: collections } = api.cc.getCollections.useQuery()

  const { mutate: createCollection } = api.cc.createCollection.useMutation({
    onSuccess(data) {
      setCollection("")
      Toast({ title: `${data.name} created successfully!!` })
    }
  }
  )
  const { mutate: createCollectionType, } = api.cc.createCollectionType.useMutation({
    onSuccess(data) {
      setCollectionType("")
      Toast({ title: `${data.name} created successfully!!` })
    }
  })



  // console.log(collectionId)
  // console.log(collectionType)

  return (
    <div>
      {/* <button onClick={() => {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",

        })
      }}
      >click</button> */}
      {/* {toastOpen ? <Toast className='alert-success' text={`${ccName} created successfully!!`} close={() => setToastOpen(false)} /> : null} */}
      <section className='p-8'>
        <div className='flex items-center justify-between shadow-[0px_2px_10px_5px_rgba(201,201,201,0.47)] rounded-[.5rem] mt-[3rem] p-4 px-8'>
          <div>
            <p className='text-[2rem] color-primary capitalize '>add new colection</p>
            <div className='md:flex p-8 px-[3rem] gap-[3rem]'>
              <div className="flex flex-col md:flex-row gap-[5rem] mb-4" >
                <input onChange={(e) => setCollection(e.target.value)} value={collection} className='border-b-2 border-gray-300 text-[1.8rem]  focus-visible:outline-none' type={"text"} placeholder={"create new collection"} />
                <button className='send-btn' onClick={() => createCollection({ name: collection })}>add</button>
              </div>
            </div>
          </div>

          <Button variant="ghost" className="h-8 w-8 p-0 ">
            <MoreHorizontal className="h-12 w-12" />
          </Button>
          <Drawer />
        </div>
        <div className='flex items-center justify-between shadow-[0px_2px_10px_5px_rgba(201,201,201,0.47)] rounded-[.5rem] mt-[3rem] p-4 px-8'>
          <div>
            <p className='text-[2rem] color-primary capitalize '>add a collection type</p>
            <div className='md:flex flex-col p-8 px-[3rem] gap-[5rem]'>

              <div className='sm:w-1/2'>
                <Dropdown
                  btnTitle='pick a collection'
                  emptyText='There are no collections at the moment'
                  data={collections}
                  setFunction={setCollectionId}
                  defaultValue={collection}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-[5rem] mb-4 " >
                <input onChange={(e) => setCollectionType(e.target.value)} value={collectionType} className='border-b-2 border-gray-300 text-[1.8rem]  focus-visible:outline-none' type={"text"} placeholder={"create new collection type"} />
                <button className='send-btn' onClick={() => createCollectionType({ name: collectionType, collectionId: collectionId })}>add</button>
              </div>
            </div>
          </div>

          <Button variant="ghost" className="h-8 w-8 p-0 ">
            <MoreHorizontal className="h-12 w-12" />
          </Button>
        </div>
      </section >
    </div >
  )
}
