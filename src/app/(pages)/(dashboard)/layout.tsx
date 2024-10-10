import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Spinner from '@/components/Spinner';

import React, { Suspense } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='flex grow'>
      <Sidebar />
      <div className='w-full wrapper flex grow flex-col'>
        <Header />
        <section
          className='content mt-16 min-h-[calc(100vh-64px)] grow py-4 lg:ml-[280px]'
          id='content'
          role='content'
        >
          <div className='container-fixed h-full'>
          <Suspense
            fallback={
              <div className='flex h-screen w-full items-center justify-center'>
                <Spinner className='size-10 border-gray-600 border-t-transparent'/>
              </div>
            }
          >
            {children}
            </Suspense>
          </div>
        </section>
        {/* <Footer /> */}
      </div>
    </main>
  );
}
