import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, XCircle, X } from 'lucide-react'

export function useToast() {
  const [toasts, setToasts] = useState([])

  const push = (message, type = 'success') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000)
  }

  return { toasts, push }
}

export function ToastContainer({ toasts }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(({ id, message, type }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium shadow-xl pointer-events-auto
              ${type === 'success'
                ? 'bg-volt-500/10 border border-volt-500/30 text-volt-400'
                : 'bg-ember-500/10 border border-ember-500/30 text-ember-400'
              }`}
          >
            {type === 'success'
              ? <CheckCircle size={16} />
              : <XCircle size={16} />
            }
            {message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
