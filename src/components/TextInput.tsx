import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

type FormInputProps = {
  label: string
  placeholder: string
  name: string
  type?: string
  register: UseFormRegister<any>
  errors?: string
  className?: string
}

const TextInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  name,
  type = 'text',
  register,
  errors,
  className
}) => {
  return (
    <div className={twMerge('col-span-1 flex flex-col gap-1', className)}>
      <label className='form-label text-gray-900'>{label}</label>
      <input
        className='input bg-white'
        {...register(name)}
        placeholder={placeholder}
        type={type}
      />
      {errors && <p className='form-hint text-red-700'>*{errors}</p>}
    </div>
  )
}

export default TextInput
