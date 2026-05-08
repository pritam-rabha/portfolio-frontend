import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Loader2, ArrowLeft } from 'lucide-react'
import { login } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await login(email, password)
      loginUser(data.token, data.user)
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center px-5">
      {/* Background */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[500px] h-[500px] bg-volt-500/[0.04] rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative w-full max-w-sm"
      >
        {/* Back link */}
        <Link to="/" className="flex items-center gap-2 text-ash-500 hover:text-ash-300
                                 text-sm mb-8 transition-colors">
          <ArrowLeft size={14} /> Back to site
        </Link>

        {/* Card */}
        <div className="card p-8">
          {/* Icon */}
          <div className="w-12 h-12 rounded-2xl bg-volt-500/15 flex items-center justify-center mb-6">
            <Lock size={20} className="text-volt-500" />
          </div>

          <h1 className="font-display font-semibold text-xl text-white mb-1">Admin login</h1>
          <p className="text-ash-500 text-sm mb-7">Restricted access — credentials required.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-ash-500 block mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="admin@example.com"
                className="field"
              />
            </div>
            <div>
              <label className="text-xs text-ash-500 block mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="field"
              />
            </div>

            {error && (
              <p className="text-xs text-ember-400 bg-ember-500/10 border border-ember-500/20
                            rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-volt w-full justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={15} className="animate-spin" /> : <Lock size={14} />}
              {loading ? 'Authenticating…' : 'Sign in'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
