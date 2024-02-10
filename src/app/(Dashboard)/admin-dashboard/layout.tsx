"use client"

import "@/styles/globals.css";
import SideBar from "@/app/_components/ui/SideBar"
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "@/trpc/react";
import { cookies } from "next/headers";
import { Toaster } from "@/components/ui/toaster";
import { RecoilRoot } from "recoil"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <TRPCReactProvider
      // cookies={cookies().toString()}
      cookies={""}
      >
        <ClerkProvider>
          <RecoilRoot>
            <body className={`font-sans`}>
              <main className="flex">
                <div className="flex-1">
                  <SideBar />
                </div>
                <Toaster />
                <section className="flex-[6]"> {children}</section>
              </main>
            </body>
          </RecoilRoot>
        </ClerkProvider>
      </TRPCReactProvider>
    </html>
  )
}