import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../lib/theme.jsx'

/**
 * Pill theme switch. The thumb springs between the two icons with
 * framer-motion, the icons cross-fade their colour, and the whole
 * control scales down slightly on press.
 */
function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <motion.button
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      className={`theme-toggle ${className}`}
      data-dark={isDark}
      onClick={toggleTheme}
      type="button"
      whileTap={{ scale: 0.94 }}
    >
      <span className="theme-toggle__icon theme-toggle__icon--sun" aria-hidden>
        <Sun size={13} strokeWidth={2.2} />
      </span>
      <span className="theme-toggle__icon theme-toggle__icon--moon" aria-hidden>
        <Moon size={13} strokeWidth={2.2} />
      </span>
      <motion.span
        aria-hidden
        className="theme-toggle__thumb"
        animate={{ x: isDark ? 30 : 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
      />
    </motion.button>
  )
}

export default ThemeToggle
