'use client';

import useUserInfo from '@/hooks/useUserInfo';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import Spinner from './Spinner';

const CookieChecker = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname()

  const { data,isPending, error } = useUserInfo();
  const user = data?.data;

  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner className="size-10 border-gray-600 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    router.push('/auth/signin');
    return null;
  }
  if (user?.role === 'admin' && pathname === '/signup') {
    // Redirect admins away from /signup
    router.push('/');
    return null;
  }

  return <>{user ? children : null}</>;
};

export default CookieChecker;
