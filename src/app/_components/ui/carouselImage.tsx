import * as React from "react"

// import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";


type ImageRes = {
    url: string;
    key: string;
    imageId: string;
    id: string
}

type Props = {
    files: ImageRes[]
}



export function CarouselSize({ files }: Props) {
    const deleteFile = async(id:string, key:string)=>{
        await fetch(`/api/uploadthing?id=${id}&key=${key}`, { method: 'DELETE' })
    }
    
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
                            <Button onClick={()=>deleteFile(file.id,file.key)} className="absolute right-0 top-0" variant="outline" size="icon">
                                <X size={10} color="#000" />
                            </Button>
                            <Image alt={file.id} src={file.url} width={100} height={100} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
