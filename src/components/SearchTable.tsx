'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type SearchBarProps = {
  placeholder: string
  name?: string
  type?: string
  
}

const SearchTable: React.FC<SearchBarProps> = ({ placeholder }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('searchTerm', value)
      params.set('page', '1')
    } else {
      params.delete('searchTerm')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }
  return (
    <div className='flex w-full sm:w-fit '>
      <label className='input-md input'>
        <i className='ki-filled ki-magnifier'></i>
        <input
          className=''
          placeholder={placeholder}
          onChange={e => {
            handleSearch(e.target.value)
          }}
          defaultValue={searchParams.get('searchTerm')?.toString()}
        />
      </label>
    </div>
  )
}

export default SearchTable
