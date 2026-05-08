import Navbar from './Navbar'
import Footer from './Footer'
import { motion } from 'framer-motion'

export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.main
        className="flex-1 pt-[68px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  )
}
