import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import DashboardPage from '@/pages/DashboardPage'
import RequestsPage from '@/pages/RequestsPage'
import RequestDetailPage from '@/pages/RequestDetailPage'
import ApiKeysPage from '@/pages/ApiKeysPage'
import DocumentationPage from '@/pages/DocumentationPage'
import SettingsPage from '@/pages/SettingsPage'
import { useEffect } from 'react'

export default function App() {
  const { user , checkAuth} = useAuthStore()

  useEffect(() => {
    checkAuth()
  } , [])



  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/dashboard" />} />
        <Route path="/docs" element={<DocumentationPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/requests/:id" element={<RequestDetailPage />} />
          <Route path="/keys" element={<ApiKeysPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}
