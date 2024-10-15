'use client'
import Spinner from '@/components/Spinner'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { IChangePasswordFormData } from '@/interfaces/auth.interface'
import { changePasswordSchema } from '@/validation/auth.validation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const ChangePassword = () => {
  const router = useRouter()
  const [passwordHidden, setPasswordHidden] = useState({
    oldPassword: true,
    newPassword: true,
    confirmNewPassword:true
  })
  const axiosPrivate = useAxiosPrivate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema)
  })
  const changePasswordMutation = useMutation({
    mutationFn: async data => {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await axiosPrivate.put('/user/change-password', data, {
        withCredentials: true
      })

      return response.data
    }
  })

  const handleChangePassword = (data: IChangePasswordFormData) => {
    changePasswordMutation.mutate(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
      {
        newPassword: data.newPassword,
        oldPassword: data.oldPassword
      },
      {
        onError: (data: any) => {
          toast.error(data.response.data.message)
        },
        onSuccess: data => {
          toast.success(data.message)
          router.push('/')
          reset()
        }
      }
    )
  }
  return (
    <div className='flex w-full justify-center'>
      <div className='w-full max-w-[1200px]'>
        <form
          className='card-body flex flex-col gap-9'
          onSubmit={handleSubmit(handleChangePassword)}
        >
          <div className='text-center'>
            <h3 className='mb-2.5 text-xl font-semibold leading-none text-gray-900'>
              Change Password
            </h3>
            {/* <span className='text-2sm font-medium text-gray-600'>
              Enter your new password
            </span> */}
          </div>
          <div className='flex flex-col gap-1'>
            <label className='form-label text-gray-900'>Old Password</label>
            <label className='input' data-toggle-password='true'>
              <input
                placeholder='Enter old password'
                type={passwordHidden.oldPassword ? 'password' : 'text'}
                {...register('oldPassword')}
              />
              <button
                type='button'
                className='btn-icon btn'
                onClick={() =>
                  setPasswordHidden({
                    ...passwordHidden,
                    oldPassword: !passwordHidden.oldPassword
                  })
                }
              >
                {passwordHidden.oldPassword ? (
                  <i className='ki-filled ki-eye-slash text-gray-500'></i>
                ) : (
                  <i className='ki-filled ki-eye text-gray-500'></i>
                )}
              </button>
            </label>
            {errors.oldPassword?.message && (
              <p className='form-hint text-red-700'>
                *{errors.oldPassword?.message}
              </p>
            )}
          </div>
          <div className='flex flex-col gap-1'>
            <label className='form-label text-gray-900'>New Password</label>
            <label className='input' data-toggle-password='true'>
              <input
                placeholder='Enter a new Password'
                type={passwordHidden.newPassword ? 'password' : 'text'}
                {...register('newPassword')}
              />
              <button
                type='button'
                className='btn-icon btn'
                onClick={() =>
                  setPasswordHidden({
                    ...passwordHidden,
                    newPassword: !passwordHidden.newPassword
                  })
                }
              >
                {passwordHidden.newPassword ? (
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
          <div className='flex flex-col gap-1'>
            <label className='form-label text-gray-900'>Confirm New Password</label>
            <label className='input' data-toggle-password='true'>
              <input
                placeholder='Re-Enter new Password'
                type={passwordHidden.confirmNewPassword? 'password' : 'text'}
                {...register('confirmNewPassword')}
              />
              <button
                type='button'
                className='btn-icon btn'
                onClick={() =>
                  setPasswordHidden({
                    ...passwordHidden,
                    confirmNewPassword: !passwordHidden.confirmNewPassword
                  })
                }
              >
                {passwordHidden.confirmNewPassword ? (
                  <i className='ki-filled ki-eye-slash text-gray-500'></i>
                ) : (
                  <i className='ki-filled ki-eye text-gray-500'></i>
                )}
              </button>
            </label>
            {errors.confirmNewPassword?.message && (
              <p className='form-hint text-red-700'>
                *{errors.confirmNewPassword?.message}
              </p>
            )}
          </div>
          <div className='flex w-full items-center justify-center gap-3'>
            <button
              type='button'
              className='btn btn-light flex max-w-[300px] grow justify-center'
              onClick={() => {
                reset()
              }}
            >
              Reset
            </button>
            <button
              type='submit'
              className='btn btn-primary flex max-w-[300px] grow justify-center'
            >
              {changePasswordMutation.isPending ? <Spinner /> : <p>Submit</p>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
