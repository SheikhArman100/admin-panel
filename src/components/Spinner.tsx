import React from 'react'
import { twMerge } from 'tailwind-merge'

type ISpinner = {
  className?: string
}

const Spinner: React.FC<ISpinner> = ({ className }) => {
  return (
    <div
      className={twMerge(
        'h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent',
        className
      )}
    ></div>
  )
}

export default Spinner