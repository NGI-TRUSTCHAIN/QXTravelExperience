import React from 'react'
import { RouteProps } from 'react-router-dom'
import { AuthProvider } from './auth-provider'

type ProtectedRouteProps = RouteProps & {
  element: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  return <AuthProvider>{element}</AuthProvider>
}

export default ProtectedRoute