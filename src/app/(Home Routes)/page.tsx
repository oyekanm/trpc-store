
import Link from "next/link";

import { api } from "@/trpc/server";
import ProductCard from "@/app/_components/productCard";
import { currentUser,auth } from "@clerk/nextjs";
import { SignOutButton, UserButton } from "@clerk/nextjs";

export default async function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  // const session = await getServerAuthSession();

  // // const session = await currentUser()
  // const authe =  auth()


  // // console.log(session);
  // console.log(authe);
  

  return (
    <main className="">
      <header className="h-[80vh] w-full bg-slate-800">
      <UserButton afterSignOutUrl="/"/>
      <SignOutButton />
      </header>

      <section className="Container my-[40px]">
        <p>Just In</p>
        <div className="grid grid-cols-4 gap-[20px]">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
        <button className="btn btn-primary block mx-auto w-[200px]">Check our new arrival</button>
      </section>
      <section className="Container my-[40px]">
        <div className="grid grid-cols-4 gap-[20px]">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </section>
    </main>
  );
}


