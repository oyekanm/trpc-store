import { cn } from '@/lib/utils'
import React from 'react'

export default function Toast({className}:{className?:string}) {
  return (
    <div className="toast">
  <div className={cn("alert alert-info ",className)}>
    <span>New message arrived.</span>
  </div>
</div>
  )
}
