import Link from 'next/link';

function Header() {
  return (
    <header className='header fixed left-0 right-0 top-0 z-10 flex h-16 shrink-0 items-center bg-[#fefefe] shadow-sm dark:bg-coal-500 lg:left-[280px]'>
      {/* begin: container */}
      <div
        className='container-fixed flex items-center justify-between lg:justify-end lg:gap-4'
        id='header_container'
      >
        {/* -----------------------------------------------mobile left side-------------------------------------- */}
        <div className='-ml-1 flex items-center gap-2 lg:hidden'>
          {/* <SideDrawer /> */}
          <Link className='shrink-0 font-semibold text-lg ps-2 ' href='/'>
            {/* <Image
              height='25'
              width='25'
              alt='logo'
              className='max-h-[25px] w-full'
              src='/media/mini-logo.svg'
            /> */}
            Softograph
          </Link>
        </div>
        {/* -------------------------------------big screen right side-------------------------------------- */}
        <div className='flex items-center gap-2 lg:gap-3.5'>
          {/* <button className='btn-icon btn btn-icon-xl relative size-10 cursor-pointer rounded-full text-gray-500 hover:bg-primary-light hover:text-primary'>
            <i className='ki-filled ki-notification-on'></i>
          </button> */}
          {/* <div className='relative size-12 rounded-full   font-semibold border-2 border-green-700  p-2'>
            <Image
              alt='avatar'
              fill
              className='w-full h-full rounded-full'
              src='/media/profile-image.png'
            />
          </div> */}
          {/* <ProfileDropdown /> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
