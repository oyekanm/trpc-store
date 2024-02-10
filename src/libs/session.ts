"use client"

import { useSession, useUser } from '@clerk/nextjs';
import React from 'react'

export function getServerAuthSession() {
    const { session} = useSession();

    return session
}
