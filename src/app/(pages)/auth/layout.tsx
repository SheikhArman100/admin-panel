import Spinner from '@/components/Spinner';

import React, { Suspense } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className='flex h-screen w-full items-center justify-center'>
          <Spinner className='size-10 border-gray-600 border-t-transparent' />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
