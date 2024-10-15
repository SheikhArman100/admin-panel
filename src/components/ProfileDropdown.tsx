'use client'
import { CustomError } from '@/error'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'
import ProfileImage from './ProfileImage'
import SignOutButton from './SignoutButton'


const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const axiosPrivate = useAxiosPrivate()
  const { data, isPending, error } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/auth/user`, {
        withCredentials: true
      })
      return response.data
    }
  })

  if (error)
    throw new CustomError(
      404,
      'Fetch Failed',
      'Failed to fetch the requested resource'
    )
  const profile = data?.data

  return (
    <div className='dropdown relative'>
      {isPending ? (
        <div className='size-9 rounded-full border-2 border-success' />
      ) : (
        <>
          <button
            className='menu-toggle btn-icon btn rounded-full'
            onClick={() => setIsOpen(!isOpen)}
          >
            <ProfileImage
              image={profile?.image}
              className='size-9 shrink-0 rounded-full border-2 border-primary'
              height={36}
              width={36}
            />
          </button>
          {isOpen ? (
            <><div className='fixed inset-0 h-screen w-full ' onClick={() => setIsOpen(false)}/><div className='show menu-default absolute right-0 top-0 w-[250px] translate-x-[-4px] translate-y-[60px] overflow-hidden rounded-lg border border-gray-300 bg-white'>
            <div className='flex items-center justify-between gap-1.5 px-3 py-1.5'>
              <div className='flex items-center gap-2'>
                <ProfileImage
                  className='size-9 rounded-full border-2 border-success'
                  height={36}
                  width={36}
                  image={profile?.image}
                />
                <div className='flex flex-col gap-1.5'>
                  <span className='text-sm font-semibold leading-none text-gray-800 break-all'>
                    {profile?.firstName} {profile?.lastName}
                  </span>
                  <p className=' text-xs font-medium leading-none text-gray-600 hover:text-primary break-all'>
                    {profile?.email}
                  </p>
                </div>
              </div>
            </div>
            <div className='border-b border-b-gray-200'></div>
            <div className='py-4'>
              {/* <div className='menu-item'>
                <Link className='menu-link' href="/user">
                  <span className='menu-icon'>
                    <i className='ki-outline ki-profile-circle'></i>
                  </span>
                  <span className='menu-title'>My Profile</span>
                </Link>
              </div> */}
              <div className='menu-item'>
                <Link className='menu-link' href='/auth/change-password'>
                  <span className='menu-icon'>
                    <i className='ki-filled ki-security-user'></i>
                  </span>
                  <span className='menu-title'>Change Password</span>
                </Link>
              </div>
              {/* <div className='menu-item'>
                <a className='menu-link' href='#'>
                  <span className='menu-icon'>
                    <i className='ki-filled ki-setting-2'></i>
                  </span>
                  <span className='menu-title'>My Account</span>
                </a>
              </div> */}
              {/* <div className='menu-item flex flex-row'>
                <a className='menu-link' href='#'>
                  <span className='menu-icon'>
                    <i className='ki-filled ki-icon'></i>
                  </span>
                  <span className='menu-title'>Language</span>
                </a>
                <div className='mx-3 flex shrink-0 items-center gap-1.5 rounded-md border border-gray-300 p-1.5 text-2xs font-medium text-gray-600'>
                  English
                  <img
                    src='/media/united-states.svg'
                    className='inline-block size-3.5 rounded-full'
                    alt='language'
                  />
                </div>
              </div> */}
            </div>
            <div className='border-b border-b-gray-200'></div>
            <div className='flex w-full items-center justify-center p-1'>
              <SignOutButton />
            </div>
          </div></>
          ) : null}
        </>
      )}
    </div>
  )
}

export default ProfileDropdown
