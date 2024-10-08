import Image from 'next/image';
import React from 'react';
import googleImage from '../../../../public/media/brand-logos/google.svg';
import appleDarkImage from '../../../../public/media/brand-logos/apple-black.svg';

const SignUp = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center grow bg-center bg-no-repeat page-bg'>
      <div className='card max-w-[370px] w-full'>
        <form
          action='#'
          className='card-body flex flex-col gap-5 p-10'
          id='sign_up_form'
          method='post'
        >
          <div className='text-center mb-2.5'>
            <h3 className='text-lg font-semibold text-gray-900 leading-none mb-2.5'>
              Sign up
            </h3>
            <div className='flex items-center justify-center font-medium'>
              <span className='text-2sm text-gray-600 me-1.5'>
                Already have an Account ?
              </span>
              <a
                className='text-2sm link'
                href='html/demo1/authentication/classNameic/sign-in.html'
              >
                Sign In
              </a>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-2.5'>
            <a className='btn btn-light btn-sm justify-center' href='#'>
              <Image
                alt=''
                height='14'
                width='14'
                className='size-3.5 shrink-0'
                src={googleImage}
              />
              Use Google
            </a>
            <a className='btn btn-light btn-sm justify-center' href='#'>
              <Image
                alt=''
                height='14'
                width='14'
                className='size-3.5 shrink-0 '
                src={appleDarkImage}
              />
              Use Apple
            </a>
          </div>
          <div className='flex items-center gap-2'>
            <span className='border-t border-gray-200 w-full'></span>
            <span className='text-2xs text-gray-500 font-medium uppercase'>
              or
            </span>
            <span className='border-t border-gray-200 w-full'></span>
          </div>
          <div className='flex flex-col gap-1'>
            <label className='form-label text-gray-900'>Email</label>
            <input
              className='input'
              name='user_email'
              placeholder='email@email.com'
              type='text'
              value=''
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='form-label text-gray-900'>Password</label>
            <label className='input' data-toggle-password='true'>
              <input
                name='user_password'
                placeholder='Enter Password'
                type='password'
                value=''
              />
              <div className='btn btn-icon' data-toggle-password-trigger='true'>
                <i className='ki-filled ki-eye text-gray-500 toggle-password-active:hidden'></i>
                <i className='ki-filled ki-eye-slash text-gray-500 hidden toggle-password-active:block'></i>
              </div>
            </label>
          </div>
          <div className='flex flex-col gap-1'>
            <label className='form-label text-gray-900'>Confirm Password</label>
            <label className='input' data-toggle-password='true'>
              <input
                name='user_password'
                placeholder='Re-enter Password'
                type='password'
                value=''
              />
              <div className='btn btn-icon' data-toggle-password-trigger='true'>
                <i className='ki-filled ki-eye text-gray-500 toggle-password-active:hidden'></i>
                <i className='ki-filled ki-eye-slash text-gray-500 hidden toggle-password-active:block'></i>
              </div>
            </label>
          </div>
          <label className='checkbox-group'>
            <input
              className='checkbox checkbox-sm'
              name='check'
              type='checkbox'
              value='1'
            />
            <span className='checkbox-label'>
              I accept
              <a className='text-2sm link' href='#'>
                Terms &amp; Conditions
              </a>
            </span>
          </label>
          <button className='btn btn-primary flex justify-center grow'>
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
