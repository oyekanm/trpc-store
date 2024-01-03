
import { getServerAuthSession } from '@/lib/session'
import { db } from '@/server/db'
// import { api } from '@/trpc/react'
import { api } from '@/trpc/server'
import { auth, currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

async function page() {
    // const session = await currentUser()

    // const user = {
    //     id: session?.id,
    //     name: session?.firstName,
    //     image: session?.imageUrl,
    //     email: session?.emailAddresses[0]?.emailAddress
    // }

    // const id = user.id

    // // console.log(user?.id);

    // if (!user || !user.id) redirect('/sign-in?origin=dashboard')

    // if (user.email !== "enitanboluwatife5@gmail.com") redirect('/')

    // const dbUser = await db.user.findFirst({
    //     where: { id }
    // })

    // console.log("dash", dbUser)

    // // if (!dbUser) redirect('/auth-callback?origin=dashboard')
    // if (!dbUser) {
    //     api.auth.authCallback.query()
    // }

    return (
        <div className='text-slate-900 font-bold text-lg'>page</div>
    )
}

export default page