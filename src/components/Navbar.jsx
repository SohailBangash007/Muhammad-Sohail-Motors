import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import ActionButton from './ActionButton.jsx'
import BrandMark from './BrandMark.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import { gsap, prefersReducedMotion } from '../lib/animations.js'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Collection', to: '/inventory' },
  { label: 'Financing', to: '/financing' },
  { label: 'Our story', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const progressRef = useRef(null)
  const setProgress = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const bar = progressRef.current
    if (!bar) return undefined

    if (!prefersReducedMotion()) {
      setProgress.current = gsap.quickSetter(bar, 'scaleX')
    }

    function handleScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const value = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0
      if (setProgress.current) setProgress.current(value)
      setScrolled(window.scrollY > 14)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [location.pathname])

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-500 ${
        scrolled
          ? 'border-line bg-page/85 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.95)] backdrop-blur-xl'
          : 'border-line bg-page'
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-14">
        <Link aria-label="Muhammad Sohail Motor House home" className="group flex items-center gap-3" onClick={closeMenu} to="/">
          <BrandMark className="size-10 shrink-0 drop-shadow-[0_10px_20px_rgba(79,140,255,0.24)] transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105" />
          <span className="leading-tight">
            <span className="block text-[12px] font-semibold tracking-[0.13em] sm:text-[13px]">MUHAMMAD SOHAIL</span>
            <span className="mt-1 block text-[8px] tracking-[0.3em] text-dim sm:text-[9px]">MOTOR HOUSE</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <NavLink
              className={({ isActive }) =>
                `nav-link text-[12px] tracking-[0.06em] transition hover:text-ink ${
                  isActive ? 'text-ink' : 'text-muted'
                }`
              }
              end={link.to === '/'}
              key={link.to}
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <ThemeToggle />

          <ActionButton
            className="hidden sm:inline-flex"
            icon={<ArrowUpRight size={14} />}
            size="sm"
            to="/contact"
            variant="outline"
          >
            Book a visit
          </ActionButton>

          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="grid size-10 place-items-center rounded-full border border-line-strong text-ink transition hover:border-[#4f8cff] hover:text-accent-soft lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-line">
        <span className="nav-progress block h-full w-full bg-gradient-to-r from-[#2a5ee0] via-[#4f8cff] to-[#cfe0ff]" ref={progressRef} />
      </span>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            animate={{ height: 'auto', opacity: 1 }}
            aria-label="Mobile navigation"
            className="absolute inset-x-0 top-full overflow-hidden border-b border-line bg-page/95 shadow-2xl backdrop-blur-xl lg:hidden"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 0.8, 0.28, 1] }}
          >
            <div className="px-6 pb-7 pt-3">
              {links.map((link, index) => (
                <motion.div
                  animate={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -14 }}
                  key={link.to}
                  transition={{ delay: 0.06 + index * 0.05, duration: 0.3 }}
                >
                  <NavLink
                    className="flex items-center justify-between border-b border-line py-4 text-sm text-subtle transition hover:text-accent-soft"
                    end={link.to === '/'}
                    onClick={closeMenu}
                    to={link.to}
                  >
                    {link.label}
                    <ArrowUpRight className="text-faint" size={15} />
                  </NavLink>
                </motion.div>
              ))}
              <ActionButton
                className="mt-6 w-full"
                icon={<ArrowUpRight size={15} />}
                onClick={closeMenu}
                size="sm"
                to="/contact"
              >
                Book a private visit
              </ActionButton>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
