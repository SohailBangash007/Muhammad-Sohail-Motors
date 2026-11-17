import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Check,
  ChevronRight,
  Gauge,
  MoveRight,
  ShieldCheck,
  Sparkles,
  Timer,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import ActionButton from '../components/ActionButton.jsx'
import CarCard from '../components/CarCard.jsx'
import SaveButton from '../components/SaveButton.jsx'
import { cars, formatCurrency, getCarById, getCarImage } from '../data/cars.js'
import { useGsapPage } from '../hooks/useGsapPage.js'

function estimateMonthly(price) {
  const principal = price * 0.8
  const rate = 6.9 / 100 / 12
  const months = 60
  return (principal * rate) / (1 - Math.pow(1 + rate, -months))
}

function CarDetailPage() {
  const { carId } = useParams()
  const car = getCarById(carId)
  const pageRef = useRef(null)
  const [activeImage, setActiveImage] = useState(0)
  useGsapPage(pageRef)

  useEffect(() => {
    setActiveImage(0)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [carId])

  if (!car) {
    return (
      <main className="flex min-h-[70vh] items-center bg-page px-5 py-24 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow">Car not found</p>
          <h1 className="display-font mt-4 text-5xl">That one has already found a home.</h1>
          <p className="mt-4 text-sm leading-7 text-muted">
            It may have sold, or the link might be a little off. The rest of the collection is right this way.
          </p>
          <ActionButton className="mt-8" icon={<ArrowLeft size={15} />} to="/inventory" variant="outline">
            Back to the collection
          </ActionButton>
        </div>
      </main>
    )
  }

  const related = cars.filter((item) => item.id !== car.id).slice(0, 3)
  const monthly = estimateMonthly(car.priceValue)

  const quickSpecs = [
    { icon: Timer, label: '0–60 mph', value: car.specs.zeroToSixty },
    { icon: Gauge, label: 'Top speed', value: car.specs.topSpeed },
    { icon: Sparkles, label: 'Power', value: car.power },
  ]

  const specRows = [
    ['Engine', car.specs.engine],
    ['0–60 mph', car.specs.zeroToSixty],
    ['Top speed', car.specs.topSpeed],
    ['Transmission', car.specs.transmission],
    ['Drivetrain', car.specs.drivetrain],
    ['Exterior', car.specs.exterior],
    ['Interior', car.specs.interior],
    ['Seats', car.specs.seats],
  ]

  return (
    <main className="bg-page" ref={pageRef}>
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-8 sm:px-8 lg:px-14 lg:pb-24">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[11px] text-dim">
          <Link className="transition hover:text-ink" to="/">Home</Link>
          <ChevronRight size={12} />
          <Link className="transition hover:text-ink" to="/inventory">Collection</Link>
          <ChevronRight size={12} />
          <span className="text-subtle">{car.name}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="gsap-reveal">
            <div className="relative overflow-hidden rounded-[28px] border border-line bg-surface">
              <motion.img
                alt={car.name}
                animate={{ opacity: 1, scale: 1 }}
                className="aspect-[1.45] w-full object-cover"
                initial={{ opacity: 0, scale: 1.04 }}
                key={car.gallery[activeImage]}
                src={getCarImage(car.gallery[activeImage], 1600)}
                transition={{ duration: 0.55, ease: [0.22, 0.8, 0.28, 1] }}
              />
              <span className="absolute left-5 top-5 rounded-full border border-line-strong bg-base/70 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-accent-soft backdrop-blur-sm">
                {car.badge}
              </span>
              <div className="absolute right-5 top-5">
                <SaveButton carId={car.id} carName={car.name} />
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {car.gallery.map((image, index) => (
                <button
                  aria-label={`View ${car.name} photo ${index + 1}`}
                  aria-pressed={activeImage === index}
                  className={`relative overflow-hidden rounded-2xl border transition ${
                    activeImage === index ? 'border-[#4f8cff] opacity-100' : 'border-line opacity-70 hover:opacity-100'
                  }`}
                  key={image}
                  onClick={() => setActiveImage(index)}
                  type="button"
                >
                  <img alt="" className="aspect-[1.6] w-full object-cover" src={getCarImage(image, 500)} />
                </button>
              ))}
            </div>
          </div>

          <aside className="gsap-reveal lg:sticky lg:top-24">
            <p className="eyebrow">{car.year} · {car.category} · {car.badge}</p>
            <h1 className="display-font mt-3 text-4xl leading-[1.02] sm:text-5xl">{car.name}</h1>
            <p className="mt-3 text-sm text-accent-soft">{car.tagline}</p>

            <div className="mt-7 flex items-end justify-between gap-4 rounded-2xl border border-line bg-surface p-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-dim">Asking price</p>
                <p className="display-font mt-1 text-3xl text-ink">{car.price}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.15em] text-dim">From</p>
                <p className="mt-1 text-sm font-semibold text-accent-soft">{formatCurrency(monthly)}/mo</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {quickSpecs.map(({ icon: Icon, label, value }) => (
                <div className="rounded-2xl border border-line bg-tint p-3 text-center" key={label}>
                  <Icon className="mx-auto text-accent" size={15} />
                  <p className="mt-2 text-sm font-semibold text-ink">{value}</p>
                  <p className="mt-0.5 text-[8px] uppercase tracking-[0.12em] text-dim">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <ActionButton className="w-full" icon={<CalendarCheck size={16} />} size="lg" to={`/contact?car=${car.id}`}>
                Book a test drive
              </ActionButton>
              <div className="grid grid-cols-2 gap-3">
                <ActionButton className="w-full" icon={<ArrowUpRight size={14} />} to={`/financing?car=${car.id}`} variant="outline">
                  Finance it
                </ActionButton>
                <ActionButton className="w-full" icon={<MoveRight size={14} />} to="/inventory" variant="ghost">
                  Browse more
                </ActionButton>
              </div>
            </div>

            <div className="mt-6 space-y-2.5 text-xs text-muted">
              <p className="flex items-center gap-2"><ShieldCheck className="text-accent" size={14} /> 180-point inspection completed</p>
              <p className="flex items-center gap-2"><Check className="text-accent" size={14} /> Full service history and two keys</p>
              <p className="flex items-center gap-2"><Check className="text-accent" size={14} /> Seven-day exchange promise</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-line bg-soft px-5 py-16 sm:px-8 lg:px-14 lg:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow">The car</p>
            <h2 className="display-font mt-4 text-3xl leading-tight sm:text-4xl">{car.tagline}</h2>
            <p className="mt-6 text-sm leading-8 text-subtle">{car.description}</p>
            <p className="mt-5 text-sm leading-8 text-dim">
              It has covered {car.mileage} from new and comes with its full book pack, both keys, and a complete history. Happy to arrange an independent inspection — we would rather you were certain.
            </p>
            <div className="mt-8 border-l-2 border-[#4f8cff]/60 pl-5">
              <p className="text-sm italic text-accent-soft">“{car.tagline}”</p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.15em] text-dim">— The Sohail collection notes</p>
            </div>
          </div>

          <div>
            <p className="eyebrow">Specification</p>
            <dl className="mt-5 divide-y divide-line rounded-2xl border border-line bg-surface px-5" data-reveal-group>
              {specRows.map(([label, value]) => (
                <div className="flex items-center justify-between gap-6 py-3.5 text-sm" data-reveal-item key={label}>
                  <dt className="text-dim">{label}</dt>
                  <dd className="text-right font-medium text-ink">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <p className="eyebrow">Included equipment</p>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {car.features.map((feature) => (
                  <li className="flex items-center gap-2 text-xs text-subtle" key={feature}>
                    <span className="grid size-4 shrink-0 place-items-center rounded-full bg-[#4f8cff]/15 text-accent-soft">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-14 lg:py-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="surface-card relative overflow-hidden p-6 sm:p-10">
            <div aria-hidden className="absolute -right-16 -top-20 size-[280px] rounded-full bg-[#4f8cff]/15 blur-[90px]" />
            <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <p className="eyebrow">Make it yours</p>
                <h2 className="display-font mt-3 text-3xl sm:text-4xl">From {formatCurrency(monthly)} per month.</h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
                  Based on 20% down over 60 months at 6.9% APR. Adjust the deposit, term, and rate to fit your month — no hard credit check.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ActionButton icon={<ArrowRight size={15} />} to={`/financing?car=${car.id}`}>
                  Open the calculator
                </ActionButton>
                <ActionButton icon={<CalendarCheck size={15} />} to={`/contact?car=${car.id}`} variant="outline">
                  Talk numbers
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-14 lg:pb-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Keep looking</p>
              <h2 className="display-font mt-3 text-3xl sm:text-4xl">You might also like.</h2>
            </div>
            <ActionButton icon={<ArrowRight size={15} />} size="sm" to="/inventory" variant="ghost">
              All cars
            </ActionButton>
          </div>
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {related.map((item) => <CarCard car={item} key={item.id} />)}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-soft px-5 py-16 sm:px-8 sm:py-20 lg:px-14">
        <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-[28px] border border-line bg-surface md:grid-cols-2">
          <div className="relative min-h-[260px] md:min-h-[360px]">
            <img
              alt={`${car.name} ready for a test drive`}
              className="absolute inset-0 size-full object-cover"
              loading="lazy"
              src={getCarImage(car.gallery[1] ?? car.image, 1100)}
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#080a0e]/45 to-transparent" />
          </div>
          <div className="flex flex-col items-start justify-center p-7 sm:p-10 lg:p-14">
            <p className="eyebrow">Better in person</p>
            <h2 className="display-font mt-4 text-4xl leading-tight text-ink sm:text-5xl">
              Get to know the {car.name}.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-muted">
              Pictures can only tell you so much. Come see the details, hear it
              start, and take it out for a proper drive.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ActionButton icon={<CalendarCheck size={15} />} to={`/contact?car=${car.id}`}>
                Book a test drive
              </ActionButton>
              <ActionButton icon={<ArrowRight size={15} />} to="/inventory" variant="ghost">
                Back to the collection
              </ActionButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CarDetailPage
