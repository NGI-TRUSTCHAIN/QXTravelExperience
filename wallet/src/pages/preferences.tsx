import NavbarLayout from '@/components/custom/navbar-layout'
import PreferencesForm from '@/components/custom/preferences'
import { navbarActions } from '@/constants/navbar'
import React from 'react'

const PreferencesPage: React.FC = () => {
  return (
    <div className='bg-slate-200 min-h-screen max-w-screen-md m-auto flex flex-col'>
      <NavbarLayout
        actions={navbarActions}
        navigationLink={true}
      />
      <div className='flex flex-col flex-grow'>
        <PreferencesForm />
      </div>
    </div>
  )
}

export default PreferencesPage