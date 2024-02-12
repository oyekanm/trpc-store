import { useToast, toast } from '@/components/ui/use-toast'
import { cn } from '@/libs/utils'
import { X } from 'lucide-react'
import React, { useEffect } from 'react'

type Props = { title: string, description?: string,}

// const {toast} = useToast()
export default function Toast({ title,description }: Props) {
  toast({
    title,
    description,
    // variant:""
  })
}
