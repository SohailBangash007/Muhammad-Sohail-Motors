import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion'
import { ArrowUpRight, Gauge, Pause, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cars, getCarImage } from '../data/cars.js'
import { prefersReducedMotion } from '../lib/animations.js'

const ROTATION_SPEED = 0.0055 // degrees per millisecond

function useOrbitRadius() {
  const [radius, setRadius] = useState(150)

  useEffect(() => {
    function measure() {
      const width = window.innerWidth
      if (width >= 1024) setRadius(224)
      else if (width >= 640) setRadius(178)
      else setRadius(Math.min(width * 0.36, 138))
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return radius
}

function OrbitItem({ car, index, total, angle, radius, active, onSelect }) {
  const step = 360 / total
  const itemAngle = useTransform(angle, (value) => value + step * index)
  const rad = (value) => (value * Math.PI) / 180
  const x = useTransform(itemAngle, (value) => Math.sin(rad(value)) * radius)
  const y = useTransform(itemAngle, (value) => -Math.cos(rad(value)) * radius)
  const rotate = useTransform(itemAngle, (value) => -value)

  return (
    <motion.button
      aria-label={`Show ${car.name}`}
      aria-pressed={active}
      className={`orbit-item ${active ? 'is-active' : ''}`}
      onClick={() => onSelect(index)}
      style={{ x, y, rotate }}
      type="button"
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.94 }}
    >
      <span className="orbit-item__frame">
        <img alt="" className="size-full rounded-full object-cover" draggable="false" src={getCarImage(car.image, 240)} />
      </span>
      <span className="orbit-item__price">{car.price}</span>
    </motion.button>
  )
}

function OrbitShowcase() {
  const [index, setIndex] = useState(2)
  const [paused, setPaused] = useState(false)
  const [spinning, setSpinning] = useState(!prefersReducedMotion())
  const angle = useMotionValue(0)
  const radius = useOrbitRadius()
  const last = useRef(0)

  useAnimationFrame((time) => {
    if (!last.current) last.current = time
    const delta = time - last.current
    last.current = time
    if (!spinning || paused) return
    angle.set((angle.get() + delta * ROTATION_SPEED) % 360)
  })

  const car = cars[index]

  return (
    <div
      className="relative mx-auto flex w-full max-w-[1120px] flex-col items-center justify-center gap-10 lg:flex-row lg:gap-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div aria-hidden className="orbit-halo" />

      <div className="orbit">
        <span aria-hidden className="orbit-ring" />
        <span aria-hidden className="orbit-ring orbit-ring--inner" />

        <Link aria-label={`View ${car.name}`} className="orbit-hub" to={`/inventory/${car.id}`}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.img
              alt={car.name}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              className="orbit-hub__image"
              exit={{ opacity: 0, scale: 1.14, rotate: -6 }}
              initial={{ opacity: 0, scale: 0.86, rotate: 6 }}
              key={car.id}
              src={getCarImage(car.image, 900)}
              transition={{ duration: 0.65, ease: [0.22, 0.8, 0.28, 1] }}
            />
          </AnimatePresence>
          <span aria-hidden className="orbit-hub__glow" />
        </Link>

        {cars.map((item, itemIndex) => (
          <OrbitItem
            active={itemIndex === index}
            angle={angle}
            car={item}
            index={itemIndex}
            key={item.id}
            onSelect={(next) => {
              setIndex(next)
              setPaused(true)
            }}
            radius={radius}
            total={cars.length}
          />
        ))}
      </div>

      <div className="relative z-20 w-full max-w-md lg:flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="orbit-panel"
            exit={{ opacity: 0, y: -12 }}
            initial={{ opacity: 0, y: 14 }}
            key={car.id}
            transition={{ duration: 0.4, ease: [0.22, 0.8, 0.28, 1] }}
          >
            <p className="eyebrow">{car.category} · {car.year}</p>
            <h3 className="display-font mt-2 text-3xl leading-tight sm:text-4xl">{car.name}</h3>
            <p className="mt-2 text-sm text-accent-soft">{car.tagline}</p>
            <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5"><Gauge size={13} /> {car.mileage}</span>
              <span>{car.power}</span>
              <span className="text-ink">{car.price}</span>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link className="orbit-cta" to={`/inventory/${car.id}`}>
                Explore this car
                <ArrowUpRight size={14} />
              </Link>
              <button
                className="orbit-pause"
                onClick={() => setSpinning((value) => !value)}
                type="button"
              >
                {spinning ? <Pause size={12} /> : <Play size={12} />}
                {spinning ? 'Pause orbit' : 'Resume orbit'}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default OrbitShowcase
