import React from 'react'
import ContactTable from './ContactTable'


const Contact = () => {
  return (
    <div className='content grow pt-5'>
    {/* ---------------------------------------------------upper part------------------------------------------------------ */}
    <div className='container-fixed'>
      <div className='flex flex-wrap items-center justify-between gap-5 pb-7.5 lg:items-end'>
        <div className='flex flex-col justify-center gap-2'>
          <h1 className='text-xl font-semibold leading-none text-gray-900'>
            Contact
          </h1>
          <div className='flex items-center gap-2 text-sm font-medium text-gray-600'>
            List of all contact
          </div>
        </div>
        <div className='flex items-center gap-2.5'>
          {/* <AddRegion /> */}
        </div>
      </div>
    </div>
    {/* -------------------------------------------Other part----------------------------------- */}
    <ContactTable />
    
    
  </div>
  )
}

export default Contact
