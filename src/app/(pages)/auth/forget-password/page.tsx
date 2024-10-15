'use client'
import Spinner from '@/components/Spinner'
import { IForgetPasswordFormData } from '@/interfaces/auth.interface'
import { forgetPassword } from '@/services/auth.service'
import { forgetPasswordSchema } from '@/validation/auth.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors }
  } = useForm<IForgetPasswordFormData>({
    resolver: zodResolver(forgetPasswordSchema)
  })

  const forgetPasswordMutation = useMutation({
    mutationFn: forgetPassword
  })
  const handleForgetPassword = (data: IForgetPasswordFormData) => {
    forgetPasswordMutation.mutate(
      {
        email: data.email
      },
      {
        onError: (data: any) => {
          toast.error(data.response.data.message)
        },
        onSuccess: data => {
          toast.success(data.message)
          reset()
        }
      }
    )
  }
  return (
    <div className='page-bg flex min-h-screen w-full grow items-center justify-center bg-center bg-no-repeat'>
      <div className='card w-full max-w-[370px]'>
        <form
          onSubmit={handleSubmit(handleForgetPassword)}
          className='card-body flex flex-col gap-5 p-10'
        >
          <div className='text-center'>
            <h3 className='text-lg font-semibold text-gray-900'>Your Email</h3>
            <span className='text-2sm font-medium text-gray-600'>
              Enter your email to reset password
            </span>
          </div>
          <div className='flex flex-col gap-1'>
            <label className='form-label text-gray-900'>Email</label>
            <input
              className='input'
              placeholder='email@email.com'
              type='text'
              {...register('email')}
            />
            {errors.email?.message && (
              <p className='form-hint text-red-700'>*{errors.email?.message}</p>
            )}
          </div>
          <button className='btn btn-primary flex grow justify-center'>
            {forgetPasswordMutation.isPending ? <Spinner /> : <p>Send</p>}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgetPassword
