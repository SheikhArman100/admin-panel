'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type IPageProps = {
  count: number
  limit: number
}

const PaginationTable: React.FC<IPageProps> = ({ count, limit }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const page = searchParams.get('page') || '1'

  const totalPages = Math.ceil(count / limit)

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('page', value)
    } else {
      params.delete('page')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }
  return (
    <div className='pagination'>
      <div className='pagination'>
        <button
          className={`btn ${parseInt(page) <= 1 ? 'disabled' : ''}`}
          disabled={parseInt(page) <= 1}
          onClick={() => {
            if (parseInt(page) > 1) {
              handleSearch((parseInt(page) - 1).toString())
            }
          }}
        >
          <i className='ki-outline ki-black-left'></i>
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`btn ${parseInt(page) === index + 1 ? 'active' : ''}`}
            onClick={() => handleSearch((index + 1).toString())}
          >
            {index + 1}
          </button>
        ))}

        <button
          className={`btn ${parseInt(page) >= totalPages ? 'disabled' : ''}`}
          disabled={parseInt(page) >= totalPages}
          onClick={() => {
            if (parseInt(page) < totalPages) {
              handleSearch((parseInt(page) + 1).toString())
            }
          }}
        >
          <i className='ki-outline ki-black-right'></i>
        </button>
      </div>
    </div>
  )
}

export default PaginationTable
