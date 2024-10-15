import SignOutButton from '@/components/SignOutButton'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FetchFailed = () => {
  return (
    <div className='flex h-screen w-full grow items-center justify-center'>
      <div className='flex flex-col items-center'>
        <div className='relative mb-16 aspect-square h-[160px]'>
          <Image
            fill
            alt='image'
            className='h-full w-full'
            src='/media/7.svg'
          />
        </div>
        <span className='badge badge-outline badge-primary mb-3'>
          Fetch Failed!!
        </span>
        <h3 className='mb-2 text-center text-2.5xl font-semibold text-gray-900'>
          Can not connect to backend
        </h3>
        {/* <div className='mb-10 text-center text-md font-medium text-gray-600'>
          <SignOutButton />
        </div> */}
      </div>
    </div>
  )
}

export default FetchFailed
