import { motion } from 'framer-motion'

function PageTransition({ children }) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
      transition={{ duration: 0.55, ease: [0.22, 0.8, 0.28, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
