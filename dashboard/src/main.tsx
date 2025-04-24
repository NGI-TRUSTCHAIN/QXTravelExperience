import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app'
import React from 'react'
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { ThemeProvider } from './providers/theme'

createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <ThemeProvider defaultTheme='system' storageKey='ui-theme'>
      <App />
      <SonnerToaster />
    </ThemeProvider>
  </React.Fragment>,
)
