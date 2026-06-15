import { Navigate, Outlet  } from 'react-router-dom'

import { useAuthStore } from '@/store/authStore'
import MainLayout from '@/components/layout/MainLayout'
import LoadingSpinner from '../ui/LoadingSpinner'

export default function ProtectedRoute() {
  const { user , loading } = useAuthStore()
  
  

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    )
  }
  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}
