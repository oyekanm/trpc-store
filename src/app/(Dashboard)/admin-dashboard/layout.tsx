import "@/styles/globals.css";
import SideBar from "@/app/_components/ui/SideBar"
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "@/trpc/react";
import { cookies } from "next/headers";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <TRPCReactProvider cookies={cookies().toString()}>
        <ClerkProvider>

          <body className={`font-sans`}>

            <main className="flex">
              <div className="flex-1">
                <SideBar />
              </div>
              <section className="flex-[6]"> {children}</section>
            </main>
          </body>
        </ClerkProvider>
      </TRPCReactProvider>
    </html>
  )
}