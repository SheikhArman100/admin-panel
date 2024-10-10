"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const MenuList = () => {
    const currentPath=usePathname()
  return (
    <div className='w-full'>
          <div className='p-5'>
            <Link
              href='/'
              className={`menu-link flex grow cursor-pointer items-center gap-[10px] rounded-md border border-transparent py-[6px] pl-[10px] pr-[10px] ${currentPath==="/" ? 'rounded-lg bg-secondary-active text-primary' : 'text-black'}`}
            ><i className={`ki-filled ki-element-11 text-lg`}></i>
            <span className='menu-title text-sm font-semibold capitalize text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary'>
              Dashboard
            </span></Link>
            <Link
              href='/contact'
              className={`menu-link flex grow cursor-pointer items-center gap-[10px] rounded-md border border-transparent py-[6px] pl-[10px] pr-[10px] ${currentPath==="/contact" ? 'rounded-lg bg-secondary-active text-primary' : 'text-black'}`}
            ><i className={`ki-filled ki-people text-lg`}></i>
            <span className='menu-title text-sm font-semibold capitalize text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary'>
              Contact
            </span></Link>
          </div>
        </div>
  )
}

export default MenuList