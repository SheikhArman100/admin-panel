'use client'
import Spinner from '@/components/Spinner'
import { IResetPasswordFormData } from '@/interfaces/auth.interface'
import { resetPassword } from '@/services/auth.service'
import { resetPasswordSchema } from '@/validation/auth.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  const [passwordHidden, setPasswordHidden] = useState(true)
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors }
  } = useForm<IResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema)
  })

  const resetPasswordMutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    mutationFn: data => resetPassword(data, token)
  })

  const handleResetPassword = (data: IResetPasswordFormData) => {
    resetPasswordMutation.mutate(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      {
        newPassword: data.newPassword
      },
      {
        onError: (data: any) => {
          toast.error(data.response.data.message)
        },
        onSuccess: data => {
          router.push('/auth/signin')
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
          onSubmit={handleSubmit(handleResetPassword)}
          className='card-body flex flex-col gap-5 p-10'
        >
          <div className='text-center'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Reset Password
            </h3>
            <span className='text-2sm font-medium text-gray-600'>
              Enter new password to reset password
            </span>
          </div>
          <div className='flex flex-col gap-1'>
            <label className='form-label text-gray-900'>New Password</label>
            <label className='input' data-toggle-password='true'>
              <input
                {...register('newPassword')}
                placeholder='Enter new password'
                type={passwordHidden ? 'password' : 'text'}
              />
              <button
                type='button'
                className='btn-icon btn'
                onClick={() => setPasswordHidden(!passwordHidden)}
              >
                {passwordHidden ? (
                  <i className='ki-filled ki-eye-slash text-gray-500'></i>
                ) : (
                  <i className='ki-filled ki-eye text-gray-500'></i>
                )}
              </button>
            </label>
            {errors.newPassword?.message && (
              <p className='form-hint text-red-700'>
                *{errors.newPassword?.message}
              </p>
            )}
          </div>
          <button className='btn btn-primary flex grow justify-center'>
          {resetPasswordMutation.isPending ? <Spinner /> : <p>Reset</p>}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
