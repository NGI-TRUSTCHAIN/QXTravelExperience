import NavbarLayout from '@/components/custom/navbar-layout'
import ProfileLayout from '@/components/custom/profile/profile-layout'
import { navbarActions } from '@/constants/navbar'
import React from 'react'

const ProfilePage : React.FC = () => {
  return (
    <div className='bg-slate-200 min-h-screen max-w-screen-md m-auto flex flex-col'>
      <NavbarLayout
      actions={navbarActions}
      navigationLink={true}
      />
      <ProfileLayout />
    </div>
  )
}

export default ProfilePage