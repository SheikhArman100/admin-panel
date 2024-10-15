'use client';
import Spinner from '@/components/Spinner';
import useUserInfo from '@/hooks/useUserInfo';
import { ISignInFormData } from '@/interfaces/auth.interface';
import { signinUser } from '@/services/auth.service';
import { useAuthStore } from '@/state/auth.state';
import { signInSchema } from '@/validation/auth.validation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const SignIn = () => {
  const [passwordHidden, setPasswordHidden] = useState(true);
  const router = useRouter();
  const setAccessToken = useAuthStore((state: any) => state.setAccessToken);
  const queryClient = useQueryClient();
  const { data, isPending } = useUserInfo();
  const user = data?.data;
  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user, router]);

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<ISignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  //sign in mutation
  const signinMutation = useMutation({
    mutationFn: signinUser,
    onSuccess: async (data: any) => {
      setAccessToken(data?.data.accessToken);
      return queryClient.refetchQueries();
    },
  });

  const handleSignIn = (data: ISignInFormData) => {
    signinMutation.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onError: (data: any) => {
          toast.error(data.response.data.message);
        },
        onSuccess: (data) => {
          router.push('/');
          setTimeout(() => {
            toast.success(data.message);
            reset();
          }, 1000);
        },
      },
    );
  };

  if (isPending) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <Spinner className='size-10 border-gray-600 border-t-transparent' />
      </div>
    );
  }

  return (
    <>
      {user ? null : (
        <div className='page-bg flex min-h-screen w-full grow items-center justify-center bg-center bg-no-repeat'>
          <div className='card w-full max-w-[370px]'>
            <form
              className='card-body flex flex-col gap-7 p-10'
              onSubmit={handleSubmit(handleSignIn)}
            >
              <div className='mb-2.5 text-center'>
                <h3 className='mb-2.5 text-lg font-semibold leading-none text-gray-900'>
                  Sign in
                </h3>
              </div>

              <div className='flex items-center gap-2'>
                <span className='w-full border-t border-gray-200'></span>
                <span className='text-2xs font-medium uppercase text-gray-500'>
                  Or
                </span>
                <span className='w-full border-t border-gray-200'></span>
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
                  <p className='form-hint text-red-700'>
                    *{errors.email?.message}
                  </p>
                )}
              </div>
              <div className='flex flex-col gap-1'>
                <div className='flex items-center justify-between gap-1'>
                  <label className='form-label text-gray-900'>Password</label>
                  <Link
                    className='link shrink-0 text-2sm'
                    href='/auth/forget-password'
                  >
                    Forgot Password?
                  </Link>
                </div>
                <label className='input' data-toggle-password='true'>
                  <input
                    placeholder='Enter Password'
                    type={passwordHidden ? 'password' : 'text'}
                    {...register('password')}
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
                {errors.password?.message && (
                  <p className='form-hint text-red-700'>
                    *{errors.password?.message}
                  </p>
                )}
              </div>

              <button className='btn btn-primary flex grow justify-center'>
                {signinMutation.isPending ? <Spinner /> : <p>Sign in</p>}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
