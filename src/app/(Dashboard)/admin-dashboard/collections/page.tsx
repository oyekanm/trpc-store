"use client"

import Dropdown from '@/app/_components/ui/dropdown'
import Toast from '@/app/_components/ui/toast'
import { api } from '@/trpc/react'
import { useState } from 'react'
import { ChevronDown, Loader2, MoreHorizontal } from "lucide-react"
import { Button } from '@/components/ui/button'
// import Drawer from '@/app/_components/ui/drawer'
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Drawer,

} from "@/components/ui/drawer"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function page() {
  const [collection, setCollection] = useState("")
  const [collectionId, setCollectionId] = useState("")
  const [collectionType, setCollectionType] = useState("")
  const [collectionOpen, setCollectionOpen] = useState(false)
  const [collectionTypeOpen, setCollectionTypeOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [collId, setCollId] = useState("")

  const { data: collections, refetch: getCollections } = api.cc.getCollections.useQuery()
  const { data: collectionTypes, refetch: getCollectionType } = api.cc.getCollectionType.useQuery()

  // Trpc mutation endpoint
  const { mutate: createCollection, isLoading: collectionLoading } = api.cc.createCollection.useMutation({
    onSuccess(data) {
      setCollection("")
      getCollections()
      Toast({ title: `${data.name} created successfully!!` })
    },
    onError(error){
      if (error?.data?.zodError?.fieldErrors) {
        for (const [key, value] of Object.entries(error?.data?.zodError?.fieldErrors)) {
            console.log(`${key}: ${value}`);
            Toast({ title: `${key}`, description: `${value}`, variant: "destructive" })
        }
    }
    }
  }
  )
  const { mutate: createCollectionType, isLoading: typeLoading } = api.cc.createCollectionType.useMutation({
    onSuccess(data) {
      setCollectionType("")
      getCollectionType()
      Toast({ title: `${data.name} created successfully!!` })
    },
    onError(error){
      if (error?.data?.zodError?.fieldErrors) {
        for (const [key, value] of Object.entries(error?.data?.zodError?.fieldErrors)) {
            console.log(`${key}: ${value}`);
            Toast({ title: `${key}`, description: `${value}`, variant: "destructive" })
        }
    }
    }
  })

  const { mutate: deleteCollection, isLoading: collectionDeleteLoading } = api.cc.deleteCollection.useMutation({
    onSuccess(data) {
      getCollections()
      Toast({ title: `${data.name} deleted successfully!!` })
    }
  })
  const { mutate: deleteCollectionType, isLoading: collTypeDeleteLoading } = api.cc.deleteCollectionType.useMutation({
    onSuccess(data) {
      getCollectionType()
      Toast({ title: `${data.name} deleted successfully!!` })
    }
  })

  const { mutate: updateCollection, isLoading: collUpdateLoading } = api.cc.updateCollection.useMutation({
    onSuccess(data) {
      setCollection("")
      getCollections()
      setIsEditing(false)
      Toast({ title: `${data.name} updated successfully!!` })
    },
    onError(error){
      if (error?.data?.zodError?.fieldErrors) {
        for (const [key, value] of Object.entries(error?.data?.zodError?.fieldErrors)) {
            console.log(`${key}: ${value}`);
            Toast({ title: `${key}`, description: `${value}`, variant: "destructive" })
        }
    }
    }
  })

  const { mutate: updateCollectionType, isLoading: collTypeUpdateLoading } = api.cc.updateCollectionType.useMutation({
    onSuccess(data) {
      setCollectionType("")
      getCollectionType()
      setIsEditing(false)
      Toast({ title: `${data.name} updated successfully!!` })
    },
    onError(error){
      if (error?.data?.zodError?.fieldErrors) {
        for (const [key, value] of Object.entries(error?.data?.zodError?.fieldErrors)) {
            console.log(`${key}: ${value}`);
            Toast({ title: `${key}`, description: `${value}`, variant: "destructive" })
        }
    }
    }
  })

  // console.log(collectionLoading)
  // console.log(collUpdateLoading)

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
              <div className="flex flex-col items-center sm:flex-row gap-[5rem] mb-4" >
                <input onChange={(e) => setCollection(e.target.value)} value={collection} className='border-b-2 border-gray-300 text-[1.8rem]  focus-visible:outline-none' type={"text"} placeholder={"create new collection"} />
                <Button disabled={collectionLoading ?? collUpdateLoading} onClick={() => {
                  if (isEditing) {
                    updateCollection({ id: collId, name: collection })
                  } else {
                    createCollection({ name: collection })
                  }
                }}
                  className='font-semibold text-[1.8rem] p-8 mt-8' variant={'secondary'} size={"lg"}>Add</Button>
              </div>
                {collectionLoading &&  <div className='flex items-center justify-center'>
                  <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
                </div> }
                {collUpdateLoading && <div className='flex items-center justify-center'>
                  <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
                </div> }
            </div>
          </div>

          <Button onClick={() => setCollectionOpen(true)} variant="ghost" className="h-8 w-8 p-0 ">
            <MoreHorizontal className="h-12 w-12" />
          </Button>
          <Drawer open={collectionOpen} onClose={() => setCollectionOpen(false)}>
            <DrawerContent className='p-4 px-8'>
              <DrawerHeader>
                <DrawerTitle className='text-[2rem] font-semibold'>Mutate the collection you created</DrawerTitle>
              </DrawerHeader>
              <div>
                {
                  collections?.map(coll => {
                    return <span className='flex items-center justify-between p-4' key={coll.id}>
                      <p className='text-[1.8rem] font-medium '>{coll.name}</p>
                      <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 " size="icon">
                            <span className="sr-only">Open menu</span>
                            <ChevronDown size={16} color="#000" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px] p-4">

                          {/* <DropdownMenuSeparator /> */}
                          <DropdownMenuItem onClick={() => {
                            setCollId(coll.id)
                            setIsEditing(true)
                            setCollection(coll.name)
                            setCollectionOpen(false)
                          }} >
                            <Button variant="ghost" >
                              <span className="text-[1.5rem] p-2 font-medium capitalize" >Edit</span>
                            </Button>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            deleteCollection({ id: coll.id })
                          }}>
                            <Button disabled={collectionDeleteLoading} variant="ghost">
                              <span className="text-[1.5rem] p-2 font-medium capitalize">Delete </span>
                            </Button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                    </span>
                  })
                }
              </div>
              <DrawerFooter>
                <DrawerClose>
                  <Button variant="ghost" className="text-[1.8rem] p-4 font-medium capitalize" onClick={() => setCollectionOpen(false)}>Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        <div className='flex items-center justify-between shadow-[0px_2px_10px_5px_rgba(201,201,201,0.47)] rounded-[.5rem] mt-[3rem] p-4 px-8'>
          <div>
            <p className='text-[2rem] color-primary capitalize '>add a collection type</p>
            <div className='md:flex flex-col p-8 px-[3rem] gap-[5rem]'>

              <div className=''>
                <Dropdown
                  btnTitle='pick a collection'
                  emptyText='There are no collections at the moment'
                  data={collections}
                  setFunction={setCollectionId}
                  defaultValue={collectionId}
                />
              </div>
              <div className="flex flex-col items-center sm:flex-row gap-[5rem] mb-4 sm:w-1/2 " >
                <input onChange={(e) => setCollectionType(e.target.value)} value={collectionType} className='border-b-2 border-gray-300 text-[1.8rem]  focus-visible:outline-none' type={"text"} placeholder={"create new collection type"} />
                <Button disabled={collTypeUpdateLoading ?? typeLoading} onClick={() => {
                  if (isEditing) {
                    updateCollectionType({ id: collId, name: collectionType,collectionId: collectionId })
                  } else {
                    createCollectionType({ name: collectionType, collectionId: collectionId })
                  }
                }}
                  className='font-semibold text-[1.8rem] p-8 mt-8' variant={'secondary'} size={"lg"}>Add</Button>
                {collTypeUpdateLoading && <div className='flex items-center justify-center'>
                  <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
                </div>}
                {typeLoading && <div className='flex items-center justify-center'>
                  <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
                </div>}
              </div>
            </div>
          </div>

          <Button onClick={() => setCollectionTypeOpen(true)} variant="ghost" className="h-8 w-8 p-0 ">
            <MoreHorizontal className="h-12 w-12" />
          </Button>
          <Drawer open={collectionTypeOpen} onClose={() => setCollectionOpen(false)}>
            <DrawerContent className='p-4 px-8'>
              <DrawerHeader>
                <DrawerTitle className='text-[2rem] font-semibold'>Mutate the collection types you created</DrawerTitle>
              </DrawerHeader>
              <div>
                {
                  collectionTypes?.map(coll => {
                    return <span className='flex items-center justify-between p-4' key={coll.id}>
                      <p className='text-[1.8rem] font-medium '>{coll.name}</p>
                      <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 " size="icon">
                            <span className="sr-only">Open menu</span>
                            <ChevronDown size={16} color="#000" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px] p-4">

                          {/* <DropdownMenuSeparator /> */}
                          <DropdownMenuItem onClick={() => {
                            setCollId(coll.id)
                            setIsEditing(true)
                            setCollectionType(coll.name)
                            setCollectionTypeOpen(false)
                            setCollectionId(coll?.collectionId??"")
                            // console.log(coll.collectionId)
                          }} >
                            <Button variant="ghost">
                              <span className="text-[1.5rem] p-2 font-medium capitalize" >Edit</span>
                            </Button>
                          </DropdownMenuItem>
                          <DropdownMenuItem className='' onClick={() => {
                            deleteCollectionType({ id: coll.id })
                            
                          }}>
                            <Button disabled={collTypeDeleteLoading} variant="ghost">
                              <span  className="text-[1.5rem] p-2 font-medium capitalize">Delete </span>
                            </Button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                    </span>
                  })
                }
              </div>
              <DrawerFooter>
                <DrawerClose>
                  <Button variant="ghost" className="text-[1.8rem] p-4 font-medium capitalize" onClick={() => setCollectionTypeOpen(false)}>Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </section >
    </div >
  )
}
