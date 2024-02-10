import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/libs/utils'
import { X } from 'lucide-react'
import React, { useEffect } from 'react'

type Props = { title: string, description: string,}

export default function Toast({ title,description }: Props) {

  const {toast} = useToast()

  useEffect(()=>{
    toast({
      title,
      description
    })
  }, [])
 

  // return toast({
  //         title,
  //         description
  //       })
  
}
