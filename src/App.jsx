import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'

import Home           from './pages/Home'
import About          from './pages/About'
import Projects       from './pages/Projects'
import Contact        from './pages/Contact'
import AdminLogin     from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import { Loader2 }    from 'lucide-react'

// NotFound page was referenced but never created — added here
function NotFound() {
  return (
    <div className="min-h-screen bg-ink-950 flex flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-volt-500 text-sm mb-4 tracking-widest uppercase">404</p>
      <h1 className="font-display font-semibold text-4xl text-white mb-4">Page not found</h1>
      <p className="text-ash-400 mb-8">The page you're looking for doesn't exist.</p>
      <a href="/" className="btn-volt">Go home</a>
    </div>
  )
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <div className="min-h-screen bg-ink-950 flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-volt-500" />
      </div>
    )
  }
  return user ? children : <Navigate to="/admin/login" replace />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/"         element={<Home />} />
      <Route path="/about"    element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact"  element={<Contact />} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      } />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
