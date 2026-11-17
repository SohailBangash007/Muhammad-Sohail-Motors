import { useEffect, useRef } from 'react'
import { ArrowUpRight, Gauge, MoveRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getCarImage } from '../data/cars.js'
import { gsap, canHover, prefersReducedMotion } from '../lib/animations.js'
import SaveButton from './SaveButton.jsx'

function CarCard({ car }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card || prefersReducedMotion() || !canHover()) return undefined

    gsap.set(card, { transformPerspective: 1100 })
    const rotateX = gsap.quickTo(card, 'rotationX', { duration: 0.65, ease: 'power3.out' })
    const rotateY = gsap.quickTo(card, 'rotationY', { duration: 0.65, ease: 'power3.out' })

    const handleMove = (event) => {
      const bounds = card.getBoundingClientRect()
      const px = (event.clientX - bounds.left) / bounds.width - 0.5
      const py = (event.clientY - bounds.top) / bounds.height - 0.5
      rotateY(px * 5)
      rotateX(-py * 4)
    }

    const handleEnter = () => {
      gsap.to(card, { y: -8, duration: 0.5, ease: 'power3.out', overwrite: 'auto' })
    }

    const handleLeave = () => {
      rotateX(0)
      rotateY(0)
      gsap.to(card, { y: 0, duration: 0.9, ease: 'elastic.out(1, 0.45)', overwrite: 'auto' })
    }

    card.addEventListener('pointerenter', handleEnter)
    card.addEventListener('pointermove', handleMove)
    card.addEventListener('pointerleave', handleLeave)

    return () => {
      card.removeEventListener('pointerenter', handleEnter)
      card.removeEventListener('pointermove', handleMove)
      card.removeEventListener('pointerleave', handleLeave)
    }
  }, [])

  return (
    <article className="car-card group" data-reveal-item ref={cardRef}>
      <div className="car-card__media aspect-[1.42]">
        <Link aria-label={`View ${car.name}`} className="absolute inset-0 z-0" to={`/inventory/${car.id}`}>
          <img alt={car.name} className="car-image size-full object-cover" loading="lazy" src={getCarImage(car.image)} />
        </Link>
        <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-line bg-base/70 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-accent-soft backdrop-blur-sm">
          {car.badge}
        </span>
        <SaveButton carId={car.id} carName={car.name} className="absolute right-4 top-4 z-20" />
        <span className="car-card__arrow pointer-events-none absolute bottom-4 right-4 z-10 grid size-10 place-items-center rounded-full bg-white text-[#070a10] shadow-lg">
          <ArrowUpRight size={17} />
        </span>
      </div>
      <div className="border-b border-line py-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-dim">
              {car.year} <span className="px-1 text-accent">/</span> {car.category}
            </p>
            <h3 className="mt-2 text-lg font-medium tracking-tight text-ink">
              <Link className="transition hover:text-accent-soft" to={`/inventory/${car.id}`}>
                {car.name}
              </Link>
            </h3>
          </div>
          <p className="pt-1 text-sm font-semibold text-accent-soft">{car.price}</p>
        </div>
        <div className="mt-5 flex items-center justify-between text-xs text-dim">
          <span className="inline-flex items-center gap-2"><Gauge size={14} /> {car.mileage}</span>
          <span>{car.power}</span>
          <Link aria-label={`Enquire about ${car.name}`} className="car-card__enquire text-ink" to={`/contact?car=${car.id}`}>
            <MoveRight size={17} />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default CarCard
