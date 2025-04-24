import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProtectedRoute from "./components/router/protected-route"
import { routes } from "@/constants/routes"
import AuthPage from "./pages/auth-page"
import NotFoundPage from "./pages/not-found-page"
import TokenIdPage from "./pages/token-id-page"
import TokenPage from "./pages/token-page"
import CustomerPage from "./pages/customer-page"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.auth.base}
          element={
            <AuthPage />
          }
        />
        <Route
          path={routes.wildcard}
          element={
            <ProtectedRoute
              requireAdmin={false}
              element={
                <NotFoundPage />
              }
            />
          }
        />
        <Route
          path={routes.tokens.base}
          element={
            <ProtectedRoute
              requireAdmin={false}
              element={
                <TokenPage />
              }
            />
          }
        />
        <Route
          path={routes.tokens.id}
          element={
            <ProtectedRoute
              requireAdmin
              element={
                <TokenIdPage />
              }
            />
          }
        />
        <Route
          path={routes.customers.base}
          element={
            <ProtectedRoute
              requireAdmin={false}
              element={
                <CustomerPage />
              }
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
