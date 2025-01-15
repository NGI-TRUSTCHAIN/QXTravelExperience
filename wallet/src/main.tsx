import App from '@/app'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Toaster } from './components/ui/toaster'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <HelmetProvider>
      <App />
      <Toaster />
    </HelmetProvider>
  </React.Fragment>
  ,
)
