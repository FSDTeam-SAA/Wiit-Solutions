'use client'

import { SessionProvider } from "next-auth/react"

export function Providerswrapper({ children }: { children: React.ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>
}