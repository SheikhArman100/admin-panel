'use client';
import Spinner from '@/components/Spinner';
import { CustomError } from '@/error';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { formatDate } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';

const SingleContact = ({ params }: { params: { contactId: string } }) => {
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const updateViewedBy = async () => {
      try {
        await axiosPrivate.post(`/contact/${params.contactId}/view`, {});
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
        <div className='grid grid-cols-1 gap-5 lg:gap-7.5 2xl:grid-cols-3'>
          <div className='col-span-1 2xl:col-span-2'>
            <div className='card'>
              <div className='card-header'>
                <h3 className='card-title'>Details</h3>
              </div>
              <div className='card-body pb-7 pt-4 scrollable-x-auto'>
                <table className='table-auto '>
                  <tbody className=''>
                    <tr>
                      <td className='pb-3 pe-4 text-sm font-medium capitalize text-gray-500'>
                        Name:
                      </td>
                      <td className='pb-3 text-sm font-medium capitalize text-gray-800'>
                        {contact?.firstName} {contact.lastName}
                      </td>
                    </tr>
                    <tr>
                      <td className='pb-3.5 pe-4 text-sm font-medium capitalize text-gray-500'>
                        Email:
                      </td>
                      <td className='pb-3.5 text-sm font-medium text-gray-800'>
                        {' '}
                        {contact?.email}
                      </td>
                    </tr>
                    <tr>
                      <td className='pb-3 pe-4 text-sm font-medium capitalize text-gray-500'>
                        Phone:
                      </td>
                      <td className='pb-3 text-sm font-medium capitalize text-gray-800'>
                        {' '}
                        {contact?.phoneNumber}
                      </td>
                    </tr>
                    <tr>
                      <td className='pb-3 pe-4 text-sm font-medium capitalize text-gray-500'>
                        Company:
                      </td>
                      <td className='pb-3 text-sm font-medium capitalize text-gray-800'>
                        {' '}
                        {contact?.companyName}
                      </td>
                    </tr>
                    <tr>
                      <td className='pb-3 pe-4 text-sm font-medium capitalize text-gray-500'>
                        Job title:
                      </td>
                      <td className='pb-3 text-sm font-medium capitalize text-gray-800'>
                        {' '}
                        {contact?.jobTitle}
                      </td>
                    </tr>
                    <tr>
                      <td className='pb-3 pe-4 text-sm font-medium capitalize text-gray-500'>
                        Recieved on:
                      </td>
                      <td className='pb-3 text-sm font-medium capitalize text-gray-800'>
                        {' '}
                        {formatDate(contact?.createdAt)}
                        
                      </td>
                    </tr>
                    <tr>
                      <td className='pb-3 pe-4 text-sm font-medium capitalize text-gray-500'>
                        Message:
                      </td>
                      <td className='pb-3 text-sm font-medium capitalize text-gray-800'>
                        {' '}
                        {contact?.message}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* <div className='mb-4'>
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
        </p> */}
      </div>
    </div>
  );
};

export default SingleContact;
