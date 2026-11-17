import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cars, getCarImage } from '../data/cars.js'

const chapters = [
  {
    key: 'Coupe',
    title: 'The Coupé Chapter',
    subtitle: 'Two doors, endless Sundays.',
    blurb: 'Closed roofs, long bonnets, and the quiet confidence of a car built around the driver. Six of our favourites live here.',
    accent: 'from-[#2f63e8] via-[#1b3a86] to-[#0a1226]',
    filter: 'Coupe',
  },
  {
    key: 'Supercar',
    title: 'The Supercar Chapter',
    subtitle: 'For the days you need a story.',
    blurb: 'Carbon, wings, and engines that sound like weather. The cars you photograph before you even unlock them.',
    accent: 'from-[#7d3bff] via-[#44218f] to-[#120a26]',
    filter: 'Supercar',
  },
  {
    key: 'Convertible',
    title: 'The Open-Top Chapter',
    subtitle: 'Roof down, world off.',
    blurb: 'Coast roads, warm evenings, and a soundtrack you did not have to pay extra for. Bring sunglasses.',
    accent: 'from-[#0ea5a5] via-[#0b5d66] to-[#071a20]',
    filter: 'Convertible',
  },
]

function BookCover({ chapter, count, car }) {
  return (
    <div className={`book-cover-surface bg-gradient-to-br ${chapter.accent}`}>
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover opacity-65"
        loading="lazy"
        src={getCarImage(car.image, 700)}
      />
      <span aria-hidden className="absolute inset-0 bg-gradient-to-br from-black/25 via-black/25 to-black/85" />
      <span aria-hidden className="book-spine" />
      <span aria-hidden className="book-stitch" />
      <div className="relative z-10 flex h-full flex-col justify-between p-5">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-semibold uppercase tracking-[0.22em] text-white/70">Sohail archive</span>
          <span className="rounded-full border border-white/25 px-2 py-0.5 text-[8px] uppercase tracking-[0.16em] text-white/80">
            No. 0{count}
          </span>
        </div>
        <div>
          <p className="display-font text-2xl leading-[1.05] text-white">{chapter.title}</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-white/65">{chapter.subtitle}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.18em] text-white/75">
          <BookOpen size={11} /> Open the chapter
        </span>
      </div>
    </div>
  )
}

function BookCard({ chapter, index, onSelect }) {
  const [open, setOpen] = useState(false)
  const chapterCars = cars.filter((car) => car.category === chapter.key)
  const count = chapterCars.length
  const featuredCar = chapterCars[0] ?? cars[index]

  const actionClass =
    'mt-4 inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-accent-soft transition hover:text-ink'

  function handleAction(event) {
    event.stopPropagation()
    if (onSelect) {
      onSelect(chapter.filter)
    }
  }

  return (
    <motion.div
      className="book-card"
      data-reveal-item
      onHoverEnd={() => setOpen(false)}
      onHoverStart={() => setOpen(true)}
    >
      <div className="book-inner">
        <div aria-hidden={!open} className="book-page">
          <div className="flex h-full flex-col">
            <img
              alt={`${featuredCar.name} in the ${chapter.title}`}
              className="mb-4 h-[36%] w-full rounded-lg object-cover"
              loading="lazy"
              src={getCarImage(featuredCar.image, 700)}
            />
            <div>
              <p className="text-[8px] uppercase tracking-[0.22em] text-accent">In this chapter</p>
              <p className="display-font mt-2 text-4xl leading-none text-ink">
                {String(count).padStart(2, '0')}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-dim">
                {count === 1 ? 'car in stock' : 'cars in stock'}
              </p>
              <p className="mt-4 text-[11px] leading-5 text-muted">{chapter.blurb}</p>
            </div>
            {onSelect ? (
              <button className={`${actionClass} mt-auto pt-3`} onClick={handleAction} type="button">
                Browse the chapter <ArrowUpRight size={12} />
              </button>
            ) : (
              <Link
                className={`${actionClass} mt-auto pt-3`}
                onClick={(event) => event.stopPropagation()}
                to={`/inventory?type=${chapter.filter}`}
              >
                Browse the chapter <ArrowUpRight size={12} />
              </Link>
            )}
          </div>
        </div>

        <motion.div
          animate={{ rotateY: open ? -158 : 0 }}
          aria-expanded={open}
          aria-label={`Open ${chapter.title}`}
          className="book-cover"
          onClick={() => setOpen((value) => !value)}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              setOpen((value) => !value)
            }
          }}
          transition={{ duration: 0.85, ease: [0.22, 0.8, 0.28, 1] }}
        >
          <BookCover car={featuredCar} chapter={chapter} count={index + 1} />
        </motion.div>
      </div>
    </motion.div>
  )
}

function BookShelf({ eyebrow = 'Read the collection', title = 'Every car has a chapter.', onSelect }) {
  return (
    <div>
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div className="gsap-reveal max-w-xl">
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden className="h-px w-8 shrink-0 bg-current opacity-60" />
            {eyebrow}
          </p>
          <h2 className="display-font mt-4 text-4xl leading-[1.05] text-ink sm:text-5xl" data-split>{title}</h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Hover a cover and it opens like a book. Three ways into the collection, each with its own personality.
          </p>
        </div>
        <AnimatePresence>
          <motion.p
            animate={{ opacity: 1 }}
            className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-faint md:flex"
            initial={{ opacity: 0 }}
          >
            <BookOpen size={13} /> Hover to open
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-3" data-reveal-group>
        {chapters.map((chapter, index) => (
          <BookCard chapter={chapter} index={index} key={chapter.key} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}

export default BookShelf
