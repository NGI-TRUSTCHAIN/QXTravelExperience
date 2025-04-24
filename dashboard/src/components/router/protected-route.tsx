import MainLayout from '@/components/custom/layout/main-layout'
import { ProtectedRouteProps } from '@/interface/routes'
import { AuthProvider } from '@/providers/auth-provider'
import React from 'react'

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  return (
    <AuthProvider>
      <MainLayout children={element} />
    </AuthProvider>
  )
}

export default ProtectedRoute