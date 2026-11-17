import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/animations.js'

const BRANDS = ['PORSCHE', 'FERRARI', 'ASTON MARTIN', 'MCLAREN', 'MERCEDES-AMG', 'LAMBORGHINI', 'BENTLEY']

function BrandMarquee() {
  const trackRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const track = trackRef.current
    const wrapper = track?.parentElement
    if (!track || !wrapper) return undefined

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 30,
      ease: 'none',
      repeat: -1,
    })

    const slowDown = () => gsap.to(tween, { timeScale: 0.2, duration: 0.6, overwrite: true })
    const speedUp = () => gsap.to(tween, { timeScale: 1, duration: 0.6, overwrite: true })

    wrapper.addEventListener('pointerenter', slowDown)
    wrapper.addEventListener('pointerleave', speedUp)

    return () => {
      wrapper.removeEventListener('pointerenter', slowDown)
      wrapper.removeEventListener('pointerleave', speedUp)
      tween.kill()
    }
  }, [])

  return (
    <div className="marquee-mask relative overflow-hidden">
      <div className="flex w-max" ref={trackRef}>
        {[0, 1].map((group) => (
          <div aria-hidden={group === 1} className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16" key={group}>
            {BRANDS.map((brand) => (
              <span className="marquee-brand" key={`${group}-${brand}`}>
                {brand}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BrandMarquee
