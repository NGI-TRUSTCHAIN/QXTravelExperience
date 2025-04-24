import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useAuthStore } from '@/hooks/use-auth'
import { useEffect, useState } from 'react'
import CreateIdModal from '../custom/modal/create-id-modal'

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated, authToken, } = useAuthStore()

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(false)
    }

    checkAuth()
  }, [authToken])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <CreateIdModal />
  }

  return children
}