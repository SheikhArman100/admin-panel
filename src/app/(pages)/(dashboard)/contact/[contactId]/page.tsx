'use client';
import Spinner from '@/components/Spinner';
import { CustomError } from '@/error';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';

const SingleContact = ({ params }: { params: { contactId: string } }) => {
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const updateViewedBy = async () => {
      try {
        await axiosPrivate.post(`/contact/${params.contactId}/view`, {
        });
      } catch (error) {
        console.error("Error updating 'viewedBy':", error);
      }
    };

    updateViewedBy();
  }, []);
  const { data, isPending, error } = useQuery({
    queryKey: ['contacts', params.contactId],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/contact/${params.contactId}`, {
        withCredentials: true,
      });
      return response.data;
    },
  });
  if (isPending) {
    return (
      <div className='flex h-[calc(100vh-64px)] w-full items-center justify-center'>
        <Spinner className='size-10 border-gray-600 border-t-transparent' />
      </div>
    );
  }

  if (error) {
    throw new CustomError(
      404,
      'Page Not Found',
      'The page you’re looking for might have been removed, had its name changed, or is temporarily unavailable',
    );
  }


  const contact = data?.data;

  return (
    <div className='container=-fixed'>
      <div className=''>
        <h2 className='text-2xl font-bold  mb-4 text-center'>
          Contact Details
        </h2>

        <div className='mb-4'>
          <p>
            <strong>Name: </strong>
            {contact?.firstName} {contact?.lastName}
          </p>
        </div>

        <div className='mb-4'>
          <p>
            <strong>Email: </strong>
            {contact?.email}
          </p>
        </div>

        <div className='mb-4'>
          <p>
            <strong>Phone Number: </strong>
            {contact?.phoneNumber}
          </p>
        </div>

        <div className='mb-4'>
          <p>
            <strong>Company Name: </strong>
            {contact?.companyName}
          </p>
        </div>

        <div className='mb-4'>
          <p>
            <strong>Job Title: </strong>
            {contact?.jobTitle}
          </p>
        </div>

        <div className='mb-4'>
          <p>
            <strong>Message: </strong>
            {contact?.message}
          </p>
        </div>

        <hr className='border-gray-300 my-4' />

        <p className='text-gray-600'>
          <strong>Received on: </strong>{' '}
          {new Date(contact?.createdAt).toLocaleDateString()} at{' '}
          {new Date(contact?.createdAt).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default SingleContact;
