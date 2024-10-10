'use client';
import PaginationTable from '@/components/PaginationTable';
import SearchTable from '@/components/SearchTable';
import Spinner from '@/components/Spinner';
import { CustomError } from '@/error';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const ContactTable = () => {
  const axiosPrivate = useAxiosPrivate()
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get('searchTerm')?.toString() || ''
  const page = searchParams.get('page')?.toString() || 1
  const { data, isPending, error } = useQuery({
    queryKey: ['contacts', searchTerm, page],
    queryFn: async () => {
      const response = await axiosPrivate.get(
        `/contact/all-contact?page=${page}${searchTerm && `&searchTerm=${searchTerm}`}`,
        {
          withCredentials: true
        }
      )
      return response.data
    }
  })

  if (error)
    throw new CustomError(
      404,
      'Fetch Failed',
      'Failed to fetch the requested resource'
    )

  const contacts = data?.data
  const count = data?.meta.count
  const limit = data?.meta.limit
  return (
    <div className='container-fixed'>
      <div className='grid gap-5 lg:gap-7.5'>
        {/* ------------------------------------table-------------------------------------- */}
        <div className='card card-grid min-w-full'>
          {/* _________________table header */}
          <div className='card-header flex-wrap justify-end gap-2'>
            
            <div className='flex flex-wrap gap-2 lg:gap-5'>
              <SearchTable placeholder='search contact' />
            </div>
          </div>
          {/* -----------------------------------table content------------------------------------------ */}
          <div className='card-body'>
            {isPending ? (
              <div className='flex h-[50vh] w-full items-center justify-center'>
                <Spinner className='size-8 border-gray-600 border-t-transparent' />
              </div>
            ) : contacts?.length === 0 ? (
              <div className='card-title flex h-[50vh] w-full items-center justify-center'>
                No contact Found
              </div>
            ) : (
              <div className='scrollable-x-auto'>
                <table className='table table-border table-auto'>
                  <thead className=''>
                    <tr>
                      <th className='min-w-[200px]'>
                        <span className='sort asc'>
                          <span className='sort-label'>Name</span>
                          {/* <span className='sort-icon'></span> */}
                        </span>
                      </th>
                      <th className='min-w-[200px]'>
                        <span className='sort asc'>
                          <span className='sort-label'>Email</span>
                          {/* <span className='sort-icon'></span> */}
                        </span>
                      </th>
                      <th className='min-w-[200px]'>
                        <span className='sort asc'>
                          <span className='sort-label'>Phone Number</span>
                          {/* <span className='sort-icon'></span> */}
                        </span>
                      </th>
                      <th className='min-w-[200px]'>
                        <span className='sort asc'>
                          <span className='sort-label'>Company Name</span>
                          {/* <span className='sort-icon'></span> */}
                        </span>
                      </th>
                      <th className='min-w-[200px]'>
                        <span className='sort asc'>
                          <span className='sort-label'>Job title</span>
                          {/* <span className='sort-icon'></span> */}
                        </span>
                      </th>

                      <th className='min-w-[80px]'>
                        <span className='sort asc'>
                          <span className='sort-label'>Action</span>
                          {/* <span className='sort-icon'></span> */}
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {contacts?.map((contact: any, index: any) => (
            <tr key={index}>
              <td>
                {contact?.firstName} {contact?.lastName}
              </td>
              <td>{contact?.email}</td>
              <td>{contact?.phoneNumber}</td>
              <td>{contact?.companyName}</td>
              <td>{contact?.jobTitle}</td>

              <td>
                <Link
                  className='btn btn-sm btn-outline btn-light'
                  href={`/contact/${contact._id}`}
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
                  </tbody>
                </table>
              </div>
            )}
            {/* ------------------------------------table----------------------------------- */}

            {/* -------------------------------pagination--------------------------- */}
            <div className='card-footer flex-col justify-between gap-5 text-2sm font-medium text-gray-600 md:flex-row '>
            <h3 className='card-title text-sm font-medium'>
              Showing {contacts?.length} of {count} contacts
            </h3>
              <PaginationTable count={count} limit={limit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactTable;
