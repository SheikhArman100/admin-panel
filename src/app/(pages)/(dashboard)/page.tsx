const Dashboard = () => {
  return (
    <div className='content grow pt-5'>
      <div className='container-fixed'>
        <div className='flex flex-wrap items-center justify-between gap-5 pb-7.5 lg:items-end'>
          <div className='flex flex-col justify-center gap-2'>
            <h1 className='text-xl font-semibold leading-none text-gray-900'>
              Dashboard
            </h1>
            <span className='flex items-center gap-2 text-sm font-medium text-gray-600'>
              Central Hub for Personal Customization
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
