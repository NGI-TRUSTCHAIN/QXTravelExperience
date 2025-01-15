import NavbarLayout from '@/components/custom/navbar-layout'
import WalletLayout from '@/components/custom/wallet/wallet-layout'
import React from 'react'

const WalletPage: React.FC = () => {
  return (
    <div className='bg-slate-200 min-h-screen max-w-screen-md m-auto flex flex-col'>
      <NavbarLayout
        actions={null}
        navigationLink={true}
      />
      <WalletLayout />
    </div>
  )
}

export default WalletPage