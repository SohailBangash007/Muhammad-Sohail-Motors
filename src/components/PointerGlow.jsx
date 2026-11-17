import { useEffect, useRef } from 'react'
import { gsap, canHover, prefersReducedMotion } from '../lib/animations.js'

/** A soft gold light that trails the cursor across the hero. */
function PointerGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow || prefersReducedMotion() || !canHover()) return undefined

    const parent = glow.parentElement
    gsap.set(glow, { xPercent: -50, yPercent: -50, opacity: 0 })

    const xTo = gsap.quickTo(glow, 'x', { duration: 0.9, ease: 'power3.out' })
    const yTo = gsap.quickTo(glow, 'y', { duration: 0.9, ease: 'power3.out' })

    const handleMove = (event) => {
      const bounds = parent.getBoundingClientRect()
      xTo(event.clientX - bounds.left)
      yTo(event.clientY - bounds.top)
    }

    const handleEnter = () => gsap.to(glow, { opacity: 1, duration: 0.6, ease: 'power2.out' })
    const handleLeave = () => gsap.to(glow, { opacity: 0, duration: 0.6, ease: 'power2.out' })

    parent.addEventListener('pointermove', handleMove)
    parent.addEventListener('pointerenter', handleEnter)
    parent.addEventListener('pointerleave', handleLeave)

    return () => {
      parent.removeEventListener('pointermove', handleMove)
      parent.removeEventListener('pointerenter', handleEnter)
      parent.removeEventListener('pointerleave', handleLeave)
    }
  }, [])

  return <div aria-hidden className="pointer-glow" ref={glowRef} />
}

export default PointerGlow
