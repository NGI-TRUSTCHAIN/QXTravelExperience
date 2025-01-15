import DeleteIdModal from '@/components/custom/modal/delete-id-modal';
import NavbarLayout from '@/components/custom/navbar-layout';
import PolicyLabels from '@/components/custom/policy-labels';
import React from 'react';

const PolicyPage: React.FC = () => {
  return (
    <div className='bg-slate-200 min-h-screen max-w-screen-md m-auto flex flex-col'>
      <NavbarLayout
        navigationLink={true}
        actions={null}
      />
      <div className='flex-grow flex flex-col justify-between px-4'>
        <PolicyLabels />
        <DeleteIdModal />
      </div>
    </div>
  )
}

export default PolicyPage