"use client"

import { api } from '@/trpc/react'
import { Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSession } from '@clerk/nextjs'

export default function page() {
  const { session} = useSession();
  const router = useRouter()
console.log(session)
  const params = useSearchParams()

  const origin = params.get("origin");

  api.auth.authCallback.useQuery(undefined,{
    onSuccess: ({ sucess }) => {
      if (sucess) {
        // user is synced to db
        router.push(origin ? `/${origin}` : '/dashboard')
      }
    },
    onError: (err) => {
      if (err.data?.code === 'UNAUTHORIZED') {
        router.push('/sign-in')
        // return <Toast className='alert-error' />
      }
    },
    retry: true,
    retryDelay: 500,
  })

  // if(!data) router.push('/api/auth/signin')

  // console.log(origin);
  
  
 
  return (
    <div className='w-full mt-24 flex justify-center'>
    <div className='flex flex-col items-center gap-2'>
      <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
      <h3 className='font-semibold text-xl'>
        Setting up your account...
      </h3>
      <p>You will be redirected automatically.</p>
    </div>
  </div>
  )
}
