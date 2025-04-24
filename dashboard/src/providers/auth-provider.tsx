import { useAuthStore, useCheckSession } from '@/hooks/use-auth'
import AuthPage from '@/pages/auth-page'
import React from 'react'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { checkAuth } = useCheckSession()
  const { authToken } = useAuthStore()

  React.useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (!authToken) {
    return (
      <AuthPage />
    )
  }

  return (
    <>
      {children}
    </>
  )
}