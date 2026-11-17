import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cars, getCarImage } from '../data/cars.js'
import SectionHeading from './SectionHeading.jsx'

const cards = [
  { name: 'Helix', car: cars[0], detail: 'Twist into the details.' },
  { name: 'Barrel', car: cars[2], detail: 'A new angle on fast.' },
  { name: 'Ring', car: cars[4], detail: 'Round after round.' },
  { name: 'Sphere', car: cars[5], detail: 'Made to move in every direction.' },
]

function MotionCard({ item, index }) {
  const isSphere = item.name === 'Sphere'

  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl border border-line bg-surface"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 0.8, 0.28, 1] }}
      whileHover={{ y: -7, borderColor: 'rgba(79,140,255,0.5)' }}
    >
      <Link aria-label={`View ${item.car.name}`} className="block" to={`/inventory/${item.car.id}`}>
        <div className={`relative aspect-[1.25] overflow-hidden bg-[#080a0e] ${isSphere ? 'grid place-items-center' : ''}`}>
          <motion.img
            alt={item.car.name}
            className={isSphere ? 'absolute size-[74%] rounded-full object-cover shadow-[0_0_60px_rgba(79,140,255,0.3)]' : 'size-full object-cover'}
            src={getCarImage(item.car.image, 700)}
            whileHover={
              item.name === 'Helix'
                ? { rotateY: 28, rotateX: -12, scale: 1.12 }
                : item.name === 'Barrel'
                  ? { rotateY: 360, scale: 1.08 }
                  : item.name === 'Ring'
                    ? { rotateZ: 8, scale: 1.1 }
                    : { rotateY: 22, rotateX: 18, scale: 1.08 }
            }
            transition={{
              duration: item.name === 'Barrel' ? 0.95 : 0.7,
              ease: [0.22, 0.8, 0.28, 1],
            }}
          />
          {item.name === 'Ring' && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-[13%] rounded-full border border-[#9dbcff]/60 shadow-[0_0_24px_rgba(79,140,255,0.22)]"
              whileHover={{ rotate: 180, scale: 0.9 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          )}
          {isSphere && (
            <>
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.2),transparent_35%),linear-gradient(120deg,transparent_45%,rgba(0,0,0,0.5))]" />
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute size-[82%] rounded-full border border-white/30"
                whileHover={{ rotateY: 55, rotateX: -30, scale: 1.12 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </>
          )}
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#080a0e]/65 px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-white/85 backdrop-blur">
            {item.name}
          </span>
          <span className="absolute bottom-4 right-4 grid size-9 place-items-center rounded-full bg-white text-[#080a0e] transition group-hover:bg-[#9dbcff]">
            <ArrowUpRight size={16} />
          </span>
        </div>
        <div className="p-5">
          <p className="text-[9px] uppercase tracking-[0.16em] text-accent-soft">{item.car.category} · {item.car.year}</p>
          <h3 className="mt-2 text-base font-medium text-ink">{item.car.name}</h3>
          <p className="mt-2 text-xs text-muted">{item.detail}</p>
        </div>
      </Link>
    </motion.article>
  )
}

function MotionCards() {
  return (
    <section className="grid-lines border-t border-line bg-page px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            description="A little Framer Motion, a lot of horsepower. Hover over each card to see its own signature move."
            eyebrow="The motion collection"
            title="Four cars. Four different moves."
          />
          <p className="hidden pb-2 text-[10px] uppercase tracking-[0.16em] text-faint md:block">Move your cursor to explore</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((item, index) => <MotionCard index={index} item={item} key={item.name} />)}
        </div>
      </div>
    </section>
  )
}

export default MotionCards
