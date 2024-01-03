import { ChevronDown } from 'lucide-react'
import React from 'react'

export default function page() {
  return (
    <div>
      <section className='p-8'>
        <div className='shadow-[0px_2px_10px_5px_rgba(201,201,201,0.47)] rounded-[.5rem] mt-[3rem] p-4 px-8'>
          <p className='text-[2rem] color-primary capitalize '>add new colection</p>
          <form action="" className='md:flex p-8 px-[3rem] gap-[3rem]'>
            <div className="flex flex-col md:flex-row gap-4 mb-4" >
              <input className='border-b-2 border-gray-300 text-[1.8rem]  focus-visible:outline-none' type={"text"} placeholder={"create new color"} />
              <button>add</button>
            </div>
          </form>
        </div>
        <div className='shadow-[0px_2px_10px_5px_rgba(201,201,201,0.47)] rounded-[.5rem] mt-[3rem] p-4 px-8'>
          <p className='text-[2rem] color-primary capitalize '>add a collection type</p>
          <form action="" className='md:flex flex-col p-8 px-[3rem] gap-[5rem]'>
          <div className="dropdown">
              <div tabIndex={0} role="button" className="btn m-1 capitalize">pick a collection <ChevronDown /></div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
              </ul>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4" >
              <input className='border-b-2 border-gray-300 text-[1.8rem]  focus-visible:outline-none' type={"text"} placeholder={"create new color"} />
              <button>add</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
