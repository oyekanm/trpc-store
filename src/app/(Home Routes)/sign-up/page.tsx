import { SignUp } from '@clerk/nextjs'
import React from 'react'

export default function page() {
  return (
    <div>
        <SignUp signInUrl='/sign-in' redirectUrl={"/dashboard"} />
    </div>
  )
}
