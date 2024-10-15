
import SignOutButton from '@/components/SignoutButton'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const UnAuthorized = () => {
  return (
    <div className='flex h-screen w-full grow items-center justify-center -translate-y-[70px]'>
      <div className='flex flex-col items-center'>
        <div className='relative mb-16 aspect-square h-[160px]'>
          <Image
            fill
            alt='image'
            className='h-full w-full'
            src='/media/5.svg'
          />
        </div>
        <span className='badge badge-outline badge-primary mb-3'>
          Unauthorized Error
        </span>
        <h3 className='mb-2 text-center text-2.5xl font-semibold text-gray-900'>
          You are not authorized to to use this page
        </h3>
        <div className='mb-10 text-center text-md font-medium text-gray-600 flex items-center gap-2'>
          <SignOutButton />
          <Link href="/"  className='btn btn-primary whitespace-nowrap'>
          Back to home
        </Link>
        </div>
        
      </div>
    </div>
  )
}

export default UnAuthorized
