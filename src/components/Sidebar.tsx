import Link from 'next/link';
import MenuList from './MenuList';

function Sidebar() {
  return (
    <div className='sidebar fixed bottom-0 top-0 z-20 hidden w-[280px] shrink-0 flex-col items-stretch border-r border-r-gray-200 bg-light dark:border-r-coal-100 dark:bg-coal-600 lg:flex'>
      <div
        className='sidebar-header relative hidden shrink-0 items-center justify-between px-3 py-6 lg:flex lg:px-6'
        id='sidebar_header'
      >
        <Link className='font-semibold text-lg ps-8' href='/'>
          {/* <img
            className='hidden min-h-[22px] max-w-none md:block'
            src='/media/default-logo.svg'
            alt='logo'
          />
          <img
            className='min-h-[22px] max-w-none md:hidden'
            src='/media/mini-logo.svg'
            alt='logo'
          /> */}
          Softograph
        </Link>
      </div>
      <div
        className='sidebar-content flex w-full shrink-0 grow py-5 pr-2'
        id='sidebar_content'
      >
        {/* <MenuList /> */}
        <MenuList />
      </div>
    </div>
  );
}

export default Sidebar;
