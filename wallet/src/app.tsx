import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/router/protected-route'
import { routes } from './constants/routes'
import HomePage from './pages/home'
import PolicyPage from './pages/policy'
import PreferencesPage from './pages/preferences'
import ProfilePage from './pages/profile'
import VerifyAuth from './pages/verify-auth'
import WalletPage from './pages/wallet'
import DIDPage from './pages/did'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path={routes.walletView} element={<VerifyAuth />} />
        <Route
          path={routes.home}
          element={<ProtectedRoute element={<HomePage />} />}
        />
        <Route
          path={routes.policy}
          element={<ProtectedRoute element={<PolicyPage />} />}
        />
        <Route
          path={routes.preferences}
          element={<ProtectedRoute element={<PreferencesPage />} />}
        />
        <Route
          path={routes.profile}
          element={<ProtectedRoute element={<ProfilePage />} />}
          />
        <Route
          path={routes.wallet}
          element={<ProtectedRoute element={<WalletPage />} />}
        />
        <Route
          path={routes.did}
          element={<ProtectedRoute element={<DIDPage />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}


export default App
