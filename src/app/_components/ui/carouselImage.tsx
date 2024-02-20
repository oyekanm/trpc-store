"use client"


// import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";


type ImageRes = {
    url: string;
    key: string;
    imageId: string;
    id: string
}

type Props = {
    files: ImageRes[];
    refetch: () => void
}



export function CarouselSize({ files, refetch }: Props) {
    const [loading, setLoading] = useState(false)
    const [clickedId, setClickedId] = useState("")
    const deleteFile = async (id: string, key: string) => {
        setClickedId(id)
        setLoading(true)
        await fetch(`/api/uploadthing?id=${id}&key=${key}`, { method: 'DELETE' }).then(async (res) => {
            const resp = await res.json()
            if (resp.message === "ok") (
                refetch()
            )
        }).finally(() => {
            setLoading(false)
        })
    }

    // console.log(loading)

    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full max-w-sm"
        >
            <CarouselContent>
                {files.map((file, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 relative">
                        <Button disabled={file.id === clickedId} onClick={() => deleteFile(file.id, file.key)} className="absolute right-0 top-0" variant="outline" size="icon">
                            <X size={10} color="#000" />
                        </Button>
                        <Image alt={file.id} src={file.url} width={100} height={100} className="w-full h-full"/>
                        {loading && file.id === clickedId && <div className='flex items-center justify-center  absolute top-1/2 left-1/2'>
                            <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
                        </div>}
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
