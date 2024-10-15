import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

import React from 'react'

export default function ErrorLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className='flex grow'>
      <Sidebar />
      <div className='wrapper flex w-full grow flex-col'>
        <Header />
        <section
          className='content mt-16 min-h-[calc(100vh-64px)] grow py-4 lg:ml-[280px]'
          id='content'
          role='content'
        >
          <div className='container-fixed h-full'>{children}</div>
        </section>
        {/* <Footer /> */}
      </div>
    </main>
  )
}
