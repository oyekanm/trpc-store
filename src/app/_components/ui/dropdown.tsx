import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton
} from '@/components/ui/select'
import { ChevronDown } from 'lucide-react'
import React from 'react'

type Props = {
  data: any,
  emptyText: string,
  setFunction: (item: string) => void,
  btnTitle: string,
  defaultValue:string
}

export default function Dropdown({ data, emptyText, setFunction, btnTitle,defaultValue }: Props) {
//  console.log(data?.filter(d=> d.id === defaultValue))
  return (
    <Select onValueChange={(e)=>setFunction(e)} value={defaultValue}>
      <SelectTrigger className="w-full my-4 p-8 rounded-[5px] focus-visible:outline-none  bg-gray-300 capitalize text-[2rem] font-semibold">
        <SelectValue  placeholder={btnTitle} />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup>
          {/* <SelectLabel>Fruits</SelectLabel> */}
          {data ?
            data.map((coll: any) => {
              return (
                <SelectItem key={coll.id} value={coll.id.toString()} className='text-[1.8rem] font-semibold  border-b-2 border-gray-300 p-4 cursor-pointer'>{coll.name}</SelectItem>
              )
            }) :
            <SelectItem value={emptyText} className='text-[1.8rem] font-semibold p-4'>{emptyText}</SelectItem>
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

// <details className="dropdown">
// <summary className="btn m-1 capitalize text-[2rem] flex bg-gray-300">{btnTitle} <ChevronDown /></summary>
//   {/* <div tabIndex={0} role="button" className="btn m-1 capitalize text-[2rem]">pick a collection <ChevronDown /></div> */}
//   <ul  className="dropdown-content z-[1] menu py-4 shadow bg-base-100 rounded-box w-[30rem] ">
//     {data ?
//       data.map((coll:any) => {
//         return (
//           <li key={coll.id} onClick={()=> setFunction(coll.id)} className='text-[1.8rem] font-semibold  border-b-2 border-gray-300 p-4 cursor-pointer'>
//             {coll.name}</li>
//         )
//       }) :
//       <li className='text-[1.8rem] font-semibold p-4'>
//         {emptyText}
//       </li>
//     }
//   </ul>
// </details>