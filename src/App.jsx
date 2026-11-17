import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import PageTransition from './components/PageTransition.jsx'
import { ThemeProvider } from './lib/theme.jsx'
import AboutPage from './pages/AboutPage.jsx'
import CarDetailPage from './pages/CarDetailPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import FinancingPage from './pages/FinancingPage.jsx'
import HomePage from './pages/HomePage.jsx'
import InventoryPage from './pages/InventoryPage.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <div className="app-shell">
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/inventory" element={<PageTransition><InventoryPage /></PageTransition>} />
            <Route path="/inventory/:carId" element={<PageTransition><CarDetailPage /></PageTransition>} />
            <Route path="/financing" element={<PageTransition><FinancingPage /></PageTransition>} />
            <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
            <Route path="*" element={<PageTransition><HomePage /></PageTransition>} />
          </Routes>
          <Footer />
        </div>
      </MotionConfig>
    </ThemeProvider>
  )
}

export default App
