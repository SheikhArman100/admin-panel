"use client"
import useUserInfo from '@/hooks/useUserInfo'
import Link from 'next/link'
import React from 'react'

const CreateAdminButton = () => {
  const { data } = useUserInfo();
  const user = data?.data;

  return (
    <>
      {(user?.role === "super_admin" )  ? (
        <Link
        href='/signup'
        className='btn btn-sm btn-primary'
      >
        Add Admin
      </Link>
      ):null }
    </>
  );
};

export default CreateAdminButton;
