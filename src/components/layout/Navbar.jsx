import { useState, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logoutUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleLogout = () => { logoutUser(); navigate('/') }

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-ink-950/90 backdrop-blur-xl border-b border-white/[0.06]' : ''
        }`}>
        <div className="max-w-6xl mx-auto px-5 h-[68px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-volt-500 rounded-lg flex items-center justify-center
                            group-hover:shadow-volt transition-all duration-300">
              <span className="font-mono text-ink-950 font-bold text-sm">P</span>
            </div>
            <span className="font-display font-semibold text-white tracking-tight">
              Pritam<span className="text-volt-500">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/admin" className="btn-volt text-xs px-4 py-2">
                  Dashboard
                </Link>
                <button onClick={handleLogout}
                  className="p-2 text-ash-400 hover:text-ember-400 transition-colors rounded-lg hover:bg-ink-700">
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <Link to="/admin/login" className="btn-ghost text-xs px-4 py-2">
                Admin
              </Link>
            )}
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-ash-300 hover:text-white transition-colors"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[68px] z-40 md:hidden
                       bg-ink-900/95 backdrop-blur-xl border-b border-white/[0.06]"
          >
            <nav className="flex flex-col p-5 gap-1">
              {NAV.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `py-3 px-4 rounded-xl text-sm font-medium transition-all ${isActive
                      ? 'bg-volt-500/10 text-volt-500'
                      : 'text-ash-300 hover:bg-ink-700 hover:text-white'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <div className="mt-3 pt-3 border-t border-white/[0.06]">
                {user && (
                  <div className="flex gap-2">
                    <Link
                      to="/admin"
                      onClick={() => setOpen(false)}
                      className="btn-volt flex-1 justify-center text-xs py-2.5"
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={() => {
                        handleLogout()
                        setOpen(false)
                      }}
                      className="btn-ghost px-4 py-2.5 text-xs"
                    >
                      <LogOut size={14} />
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
