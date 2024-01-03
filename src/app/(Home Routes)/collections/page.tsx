import CollectionTypeCard from '@/app/_components/CollectionTypeCard'
import React from 'react'

export default function page() {
  return (
    <section className="Container my-[40px]">
    <div className="grid grid-cols-4 gap-[20px]">
      <CollectionTypeCard />
      <CollectionTypeCard />
      <CollectionTypeCard />
      <CollectionTypeCard />
    </div>
  </section>
  )
}
