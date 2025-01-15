import NavbarLayout from '@/components/custom/navbar-layout'
import { CombinedTokenBalanceCard } from '@/components/custom/combined-token-balance-card'
import { navbarActions } from '@/constants/navbar'
import { useFetchCombinedTokenBalance } from '@/hooks/use-user'
import React from 'react'
import { CombinedTokenBalanceCardSkeleton } from '@/components/custom/skeleton'

const HomePage: React.FC = () => {
  const { combinedTokenBalance, fetchCombinedTokenBalance, loading } = useFetchCombinedTokenBalance();

  React.useEffect(() => {
    fetchCombinedTokenBalance();
  }, [fetchCombinedTokenBalance]);

  return (
    <div className='bg-slate-200 min-h-screen max-w-screen-md m-auto flex flex-col'>
      <NavbarLayout
        actions={navbarActions}
        navigationLink={false}
        label="QX Travel Wallet"
      />
      <div className='px-4 mt-6'>
        {loading ? (
          <CombinedTokenBalanceCardSkeleton />
        ) : combinedTokenBalance ? (
          <CombinedTokenBalanceCard combinedTokenBalance={combinedTokenBalance} />
        ) : null}
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Earn More Tokens!</h3>
          <p className="text-gray-600">Visit exciting places and attractions to earn QX tokens that you can use for travel rewards.</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage