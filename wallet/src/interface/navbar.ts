import React from 'react'

export interface NavbarProps {
  navigationLink?: boolean
  label?: string
  actions: NavbarActionProps[] | null
}

export interface NavbarActionProps {
  route: string
  icon: React.ReactNode
}

export interface IconButtonProps {
  onClick: () => void
  active: boolean
  icon: React.ReactNode
  notificationValue?: number
}