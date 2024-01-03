import { SignIn } from '@clerk/nextjs'
import React from 'react'

export default function page() {
  return (
   <>
   <SignIn redirectUrl={"/dashboard"} signUpUrl='/sign-up'/>
   </>
  )
}
