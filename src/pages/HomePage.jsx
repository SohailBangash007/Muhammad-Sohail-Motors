import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Check,
  ChevronRight,
  Gauge,
  Handshake,
  Search,
  RotateCw,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
  Wrench,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import ActionButton from '../components/ActionButton.jsx'
import BrandMarquee from '../components/BrandMarquee.jsx'
import BookShelf from '../components/BookShelf.jsx'
import CarCard from '../components/CarCard.jsx'
import MotionCards from '../components/MotionCards.jsx'
import OrbitShowcase from '../components/OrbitShowcase.jsx'
import PointerGlow from '../components/PointerGlow.jsx'
import SaveButton from '../components/SaveButton.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { cars, getCarImage } from '../data/cars.js'
import { useGsapPage } from '../hooks/useGsapPage.js'

const steps = [
  {
    icon: Search,
    title: 'Find your car',
    text: 'Browse a small, hand-picked collection. Filter by body style, budget, or simply how it makes you feel.',
  },
  {
    icon: CalendarCheck,
    title: 'Book a proper look',
    text: 'Pick a time that suits you. We will have the car ready, the history open, and the coffee on.',
  },
  {
    icon: Handshake,
    title: 'Drive away smiling',
    text: 'Transparent pricing, financing in-house, and a handover that takes as long as it needs to.',
  },
]

const perks = [
  'Every car inspected across 180 points',
  'Full history and paperwork, no surprises',
  'Trade-in valued in under 24 hours',
  'Extended warranty options on every car',
  'Nationwide enclosed delivery',
  'Seven-day exchange promise',
]

const testimonials = [
  {
    quote: 'They found the exact 911 I had been half-looking for, then talked me out of the more expensive one. That is when I knew.',
    name: 'Daniel Reyes',
    role: '911 Carrera owner',
  },
  {
    quote: 'No pressure, no theatre. Just a beautiful Roma, an honest history file, and the best handover I have had in twenty years of buying cars.',
    name: 'Sofia Almeida',
    role: 'Ferrari Roma owner',
  },
  {
    quote: 'The financing was sorted before I arrived. I drove in for a look and left in an AMG. My weekend plans have never recovered.',
    name: 'Marcus Chen',
    role: 'AMG GT owner',
  },
]

const heroCars = [cars[2], cars[0], cars[4]]

function HomePage() {
  const pageRef = useRef(null)
  const navigate = useNavigate()
  const [featured, setFeatured] = useState(heroCars[0])
  const [barrelTurns, setBarrelTurns] = useState(0)
  const [type, setType] = useState('Any body style')
  const [budget, setBudget] = useState('Any budget')
  useGsapPage(pageRef)

  function handleQuickSearch(event) {
    event.preventDefault()
    const params = new URLSearchParams()
    if (type !== 'Any body style') params.set('type', type)
    if (budget !== 'Any budget') params.set('max', budget)
    navigate(`/inventory${params.toString() ? `?${params.toString()}` : ''}`)
  }

  function playBarrelRoll() {
    setBarrelTurns((turns) => turns + 1)
  }

  return (
    <main ref={pageRef}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="on-dark relative isolate overflow-hidden border-b border-line bg-[#080a0e]">
        <div aria-hidden className="hero-ambient absolute inset-0" />
        <div aria-hidden className="grid-lines absolute inset-0 opacity-40" />
        <PointerGlow />

        <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-center gap-8 px-5 pb-20 pt-14 sm:px-8 min-[900px]:grid-cols-[1.05fr_0.95fr] min-[900px]:gap-8 lg:px-14 lg:pb-24 lg:pt-16">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="relative z-20 max-w-[760px]"
            initial={{ opacity: 0, y: 22 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 0.8, 0.28, 1] }}
          >
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-tint px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-subtle backdrop-blur-sm">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#4f8cff] opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-[#4f8cff]" />
              </span>
              Malibu&apos;s modern sports car house
            </p>

            <h1 className="display-font text-[clamp(3rem,5.2vw,4.65rem)] leading-[0.94] tracking-[-0.06em]">
              <span className="-mb-2 block overflow-hidden pb-2">
                <span className="inline-block">Drive something</span>
              </span>
              <span className="-mb-2 block overflow-hidden pb-2">
                <span className="inline-block">
                  <span className="text-gradient italic">extraordinary.</span>
                </span>
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-sm leading-7 text-[#c8d2e4] sm:text-base">
              Not just a car to own. A feeling you keep coming back for. Meet a hand-picked collection, ready for the long way home.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <ActionButton icon={<ArrowUpRight size={16} />} size="lg" to="/inventory">
                Explore the collection
              </ActionButton>
              <ActionButton icon={<CalendarCheck size={16} />} size="lg" to="/contact" variant="outline">
                Book a test drive
              </ActionButton>
            </div>

          </motion.div>

          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="hero-visual relative mx-auto w-full max-w-[720px] lg:ml-auto"
            initial={{ opacity: 0, x: 36 }}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 0.8, 0.28, 1] }}
          >
            <motion.div
              aria-hidden="true"
              animate={{ rotate: 360 }}
              className="hero-orbit absolute -right-5 -top-5 aspect-square w-[43%] rounded-full border border-white/[0.08]"
              transition={{ duration: 90, ease: 'linear', repeat: Infinity }}
            />
            <div className="hero-card-shell">
              <motion.div
                className="hero-vehicle-frame relative aspect-[1.3] overflow-hidden bg-[#111722] sm:aspect-[1.4]"
                whileHover={{ rotateY: -1.5, rotateX: 1, scale: 1.006 }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
              >
                <motion.div
                  animate={barrelTurns ? {
                    rotateY: 360,
                    rotateZ: [0, 8, 0],
                    scale: [1, 0.84, 1],
                  } : { rotateY: 0, rotateZ: 0, scale: 1 }}
                  className="absolute inset-0"
                  initial={barrelTurns ? { rotateY: 0, rotateZ: 0, scale: 1 } : false}
                  key={barrelTurns}
                  style={{ transformPerspective: 1100, transformStyle: 'preserve-3d' }}
                  transition={{ duration: 1.15, ease: [0.22, 0.8, 0.28, 1] }}
                >
                  <motion.img
                    alt={`${featured.name} in the Muhammad Sohail collection`}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    className="hero-car-photo size-full object-cover"
                    initial={{ opacity: 0, scale: 1.06, x: 12 }}
                    key={featured.id}
                    src={getCarImage(featured.image, 1600)}
                    transition={{ duration: 0.75, ease: [0.22, 0.8, 0.28, 1] }}
                  />
                </motion.div>
                <div aria-hidden="true" className="hero-card-shade absolute inset-0" />
                <div aria-hidden="true" className="hero-card-glint absolute inset-0" />

                <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-2 sm:left-6 sm:right-6 sm:top-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#080a0e]/45 px-3 py-2 text-[8px] uppercase tracking-[0.18em] text-white/85 backdrop-blur-md">
                    <span className="size-1.5 animate-pulse rounded-full bg-[#9dbcff]" /> Curated, not collected
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="hidden font-mono text-[9px] tracking-[0.14em] text-white/75 sm:inline">MSH — 00{heroCars.indexOf(featured) + 1}</span>
                    <button
                      aria-label={`Play barrel roll animation for ${featured.name}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-[#080a0e]/65 px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md transition hover:border-[#9dbcff]/70 hover:bg-[#14203a]"
                      onClick={playBarrelRoll}
                      type="button"
                    >
                      <motion.span
                        animate={{ rotate: barrelTurns * 360 }}
                        transition={{ duration: 1.1, ease: [0.22, 0.8, 0.28, 1] }}
                      >
                        <RotateCw size={12} />
                      </motion.span>
                      Barrel roll
                    </button>
                  </div>
                </div>

                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-5 left-5 right-5 text-white sm:bottom-7 sm:left-7 sm:right-7"
                  initial={{ opacity: 0, y: 12 }}
                  key={`${featured.id}-details`}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#c8d2e4]">{featured.year} <span className="px-1 text-[#9dbcff]">/</span> {featured.category} <span className="px-1 text-[#9dbcff]">/</span> {featured.badge}</p>
                  <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
                    <h2 className="display-font text-3xl leading-none sm:text-4xl">{featured.name}</h2>
                    <span className="text-sm text-white/90">{featured.price}</span>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/25 pt-4 text-[9px] uppercase tracking-[0.15em] text-white/75">
                    <span className="inline-flex items-center gap-2"><Gauge className="text-[#9dbcff]" size={13} /> {featured.power}</span>
                    <span>{featured.mileage} · inspected</span>
                    <Link className="ml-auto inline-flex items-center gap-1.5 text-white transition hover:text-[#b9d2ff]" to={`/inventory/${featured.id}`}>
                      View details <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <div aria-label="Choose a featured car" className="mt-4 grid grid-cols-3 gap-2.5" role="group">
              {heroCars.map((car, index) => (
                <button
                  aria-pressed={featured.id === car.id}
                  className={`hero-car-picker group flex min-w-0 items-center gap-2.5 rounded-xl border p-2.5 text-left transition sm:gap-3 sm:p-3 ${
                    featured.id === car.id
                      ? 'is-selected border-[#7da8ff]/70 bg-[#4f8cff]/10'
                      : 'border-white/10 bg-white/[0.025] hover:border-white/25'
                  }`}
                  key={car.id}
                  onClick={() => setFeatured(car)}
                  type="button"
                >
                  <img alt="" className="size-11 shrink-0 rounded-lg object-cover sm:size-12" loading="lazy" src={getCarImage(car.image, 200)} />
                  <span className="min-w-0">
                    <span className="block text-[8px] uppercase tracking-[0.15em] text-dim">0{index + 1} / {car.category}</span>
                    <span className="mt-1 block truncate text-[10px] font-medium text-ink sm:text-xs">{car.name}</span>
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1440px] gap-5 border-t border-white/10 px-5 py-6 sm:px-8 min-[900px]:grid-cols-[1.05fr_0.95fr] min-[900px]:items-center lg:px-14">
          <form
            className="grid grid-cols-1 gap-2 rounded-2xl border border-white/12 bg-white/[0.035] p-2 backdrop-blur-md sm:grid-cols-[1fr_1fr_auto]"
            onSubmit={handleQuickSearch}
          >
            <label className="relative">
              <span className="sr-only">Body style</span>
              <select
                className="h-full w-full appearance-none rounded-xl border border-white/10 bg-[#080b12]/70 px-4 py-3 text-xs text-[#dbe3f0] outline-none transition hover:border-white/25 focus:border-[#4f8cff]"
                onChange={(event) => setType(event.target.value)}
                value={type}
              >
                <option>Any body style</option>
                <option>Coupe</option>
                <option>Supercar</option>
                <option>Convertible</option>
              </select>
              <ChevronRight className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-dim" size={14} />
            </label>
            <label className="relative">
              <span className="sr-only">Budget</span>
              <select
                className="h-full w-full appearance-none rounded-xl border border-white/10 bg-[#080b12]/70 px-4 py-3 text-xs text-[#dbe3f0] outline-none transition hover:border-white/25 focus:border-[#4f8cff]"
                onChange={(event) => setBudget(event.target.value)}
                value={budget}
              >
                <option value="Any budget">Any budget</option>
                <option value="100000">Up to $100k</option>
                <option value="150000">Up to $150k</option>
                <option value="200000">Up to $200k</option>
                <option value="300000">Up to $300k</option>
              </select>
              <ChevronRight className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-dim" size={14} />
            </label>
            <ActionButton icon={<Search size={15} />} type="submit">Find your car</ActionButton>
          </form>

          <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-4 sm:gap-x-8">
            <div>
              <span className="display-font text-2xl text-ink" data-counter="8" data-prefix="0">08</span>
              <span className="ml-2 text-[8px] uppercase tracking-[0.13em] text-muted sm:text-[9px]">Cars in stock</span>
            </div>
            <div className="h-7 w-px bg-line-strong" />
            <div>
              <span className="display-font text-2xl text-ink" data-counter="120" data-suffix="+">120+</span>
              <span className="ml-2 text-[8px] uppercase tracking-[0.13em] text-muted sm:text-[9px]">Happy owners</span>
            </div>
            <div className="h-7 w-px bg-line-strong" />
            <div>
              <span className="display-font text-2xl text-ink" data-counter="4.9" data-decimals="1">4.9</span>
              <span className="ml-2 inline-flex items-center gap-1 text-[8px] uppercase tracking-[0.13em] text-muted sm:text-[9px]">
                <Star className="text-accent" fill="currentColor" size={11} /> Owner rating
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 left-5 z-10 flex items-center gap-3 text-[9px] uppercase tracking-[0.18em] text-muted sm:left-8 lg:left-14">
          <ArrowDown className="animate-bounce text-accent" size={14} /> Scroll to explore
        </div>
        <div className="absolute bottom-7 right-5 z-10 hidden text-right text-[9px] uppercase tracking-[0.16em] text-muted sm:block sm:right-8 lg:right-14">
          34°01&apos; N &nbsp; 118°48&apos; W
        </div>
      </section>

      {/* ── Marquees ─────────────────────────────────────────── */}
      <section className="border-y border-line bg-soft">
        <div className="mx-auto flex max-w-[1440px] items-center gap-5 px-5 py-6 sm:gap-7 sm:px-8 lg:px-14">
          <span className="eyebrow shrink-0">Marques we love</span>
          <span className="hidden h-4 w-px shrink-0 bg-line-strong sm:block" />
          <div className="min-w-0 flex-1">
            <BrandMarquee />
          </div>
        </div>
      </section>

      {/* ── Orbit showcase ───────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line bg-soft px-5 py-20 sm:px-8 sm:py-24 lg:px-14">
        <div aria-hidden className="grid-lines absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-[1280px]">
          <SectionHeading
            align="center"
            description="Eight cars arranged in a slow orbit. Hover to pause it, click any car to bring it into focus, then step inside."
            eyebrow="Spin through the collection"
            title="Eight cars. One orbit."
          />
          <div className="mt-14">
            <OrbitShowcase />
          </div>
        </div>
      </section>

      {/* ── Spotlight car ────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-page px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
        <div aria-hidden className="absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-[#4f8cff]/10 blur-[140px]" />
        <div className="relative mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          <div className="gsap-reveal on-dark relative">
            <div className="relative overflow-hidden rounded-[28px] border border-line">
              <img
                alt={featured.name}
                className="aspect-[1.35] w-full object-cover"
                src={getCarImage(featured.gallery[0], 1600)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06080d]/70 via-transparent to-transparent" />
              <span className="absolute left-5 top-5 rounded-full border border-line-strong bg-base/70 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-accent-soft backdrop-blur-sm">
                This week&apos;s spotlight
              </span>
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-subtle">{featured.year} · {featured.category}</p>
                  <p className="display-font mt-1 text-3xl text-ink sm:text-4xl">{featured.name}</p>
                </div>
                <SaveButton carId={featured.id} carName={featured.name} />
              </div>
            </div>
          </div>

          <div>
            <SectionHeading
              description={featured.description}
              eyebrow="One worth a closer look"
              title={featured.tagline}
            />
            <div className="mt-8 grid grid-cols-3 gap-3" data-reveal-group>
              {[
                { icon: Timer, label: '0–60 mph', value: featured.specs.zeroToSixty },
                { icon: Gauge, label: 'Top speed', value: featured.specs.topSpeed },
                { icon: Sparkles, label: 'Power', value: featured.power },
              ].map(({ icon: Icon, label, value }) => (
                <div className="surface-card p-4" data-reveal-item key={label}>
                  <Icon className="text-accent" size={16} />
                  <p className="mt-3 text-sm font-semibold text-ink">{value}</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-dim">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ActionButton icon={<ArrowRight size={15} />} to={`/inventory/${featured.id}`}>
                View this car
              </ActionButton>
              <ActionButton icon={<ArrowUpRight size={15} />} to="/financing" variant="ghost">
                Estimate the finance
              </ActionButton>
            </div>
            <p className="mt-6 text-xs text-dim">
              From <span className="text-accent-soft">$3,412/mo</span> with 20% down · 60 months · 6.9% APR
            </p>
          </div>
        </div>
      </section>

      {/* ── Collection preview ───────────────────────────────── */}
      <section className="border-t border-line bg-soft px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <SectionHeading
              description="A small, considered collection. Every car inspected, photographed honestly, and ready for a proper test drive."
              eyebrow="The current collection"
              title={<>Three good reasons<br className="hidden sm:block" /> to leave the house.</>}
            />
            <ActionButton icon={<ArrowRight size={15} />} size="sm" to="/inventory" variant="ghost">
              View all {cars.length} cars
            </ActionButton>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3" data-reveal-group>
            {cars.slice(0, 3).map((car) => <CarCard car={car} key={car.id} />)}
          </div>
        </div>
      </section>

      {/* ── Chapters ─────────────────────────────────────────── */}
      <section className="border-t border-line bg-soft px-5 py-20 sm:px-8 sm:py-24 lg:px-14">
        <div className="mx-auto max-w-[1440px]">
          <BookShelf />
        </div>
      </section>

      <MotionCards />

      {/* ── Process ──────────────────────────────────────────── */}
      <section className="grid-lines border-t border-line bg-page px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading
            align="center"
            description="Three simple steps. No games, no last-minute surprises, no sitting in a plastic chair while someone talks to a manager."
            eyebrow="How it works"
            title="A better way to buy a car."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3" data-reveal-group>
            {steps.map(({ icon: Icon, title, text }, index) => (
              <article className="surface-card group relative p-7" data-reveal-item key={title}>
                <span className="display-font absolute right-6 top-5 text-4xl text-ink/[0.06]">0{index + 1}</span>
                <span className="icon-tile"><Icon size={20} strokeWidth={1.6} /></span>
                <h3 className="mt-6 text-lg font-medium text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{text}</p>
                {index < steps.length - 1 && (
                  <ChevronRight className="absolute -right-3 top-1/2 hidden text-[#3a4253] md:block" size={20} />
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Difference ───────────────────────────────────────── */}
      <section className="bg-page px-5 py-20 text-ink sm:px-8 sm:py-28 lg:px-14">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
          <div>
            <SectionHeading
              description="We are car people first. That means honest histories, fair prices, and a team that would rather find you the right car than the most expensive one."
              eyebrow="The Sohail difference"
              title={<>Less showroom.<br />More certainty.</>}
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2" data-reveal-group>
              {perks.map((perk) => (
                <li className="flex items-start gap-2.5 text-sm text-subtle" data-reveal-item key={perk}>
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#4f8cff]/12 text-accent">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-4">
              <ActionButton icon={<ArrowRight size={15} />} to="/about">
                Meet the team
              </ActionButton>
              <ActionButton icon={<ShieldCheck size={15} />} to="/financing" variant="light">
                How finance works
              </ActionButton>
            </div>
          </div>
          <div className="relative min-h-[400px] overflow-hidden rounded-[28px] shadow-[0_50px_100px_-60px_rgba(10,15,25,0.55)] sm:min-h-[540px]">
            <div aria-hidden className="editorial-photo absolute inset-0" data-parallax-photo="6" />
            <div aria-hidden className="editorial-shade absolute inset-0" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-line-strong bg-page/80 p-5 backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-8 sm:p-7">
              <div className="flex items-center gap-1 text-accent-soft">
                {[0, 1, 2, 3, 4].map((star) => <Star fill="currentColor" key={star} size={13} />)}
              </div>
              <p className="mt-3 text-lg leading-snug text-ink">
                “The best part is what happens after you leave.”
              </p>
              <p className="mt-3 text-[9px] uppercase tracking-[0.16em] text-muted">— The Sohail promise</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="bg-page px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              description="Real owners, real drives. A few words from people who have stood in our showroom."
              eyebrow="Owner stories"
              title="Bought here. Still smiling."
            />
            <p className="flex items-center gap-2 text-xs text-muted">
              <Star className="text-accent" fill="currentColor" size={14} />
              <span className="text-ink">4.9 / 5</span> from 120+ owners
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3" data-reveal-group>
            {testimonials.map((testimonial) => (
              <figure className="surface-card flex h-full flex-col p-7" data-reveal-item key={testimonial.name}>
                <div className="flex items-center gap-1 text-accent">
                  {[0, 1, 2, 3, 4].map((star) => <Star fill="currentColor" key={star} size={13} />)}
                </div>
                <blockquote className="mt-5 flex-1 text-sm leading-7 text-subtle">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-[#4f8cff]/40 to-[#2a5ee0]/40 text-xs font-semibold text-accent-soft">
                    {testimonial.name.split(' ').map((part) => part[0]).join('')}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">{testimonial.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-dim">{testimonial.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────── */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-14">
        <div className="on-dark relative mx-auto max-w-[1440px] overflow-hidden rounded-[32px] border border-line">
          <div aria-hidden className="contact-photo absolute inset-0" data-parallax-photo="6" />
          <div aria-hidden className="contact-shade absolute inset-0" />
          <div className="relative z-10 flex flex-col items-start gap-8 px-6 py-16 sm:px-12 sm:py-20 lg:flex-row lg:items-center lg:justify-between lg:px-16">
            <div className="max-w-2xl">
              <p className="eyebrow">Your next chapter</p>
              <h2 className="display-font mt-4 text-4xl leading-[1.05] text-ink sm:text-5xl" data-split>
                Some things are better experienced in person.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-subtle">
                Book a private visit and we will have the cars you are interested in ready, warmed up, and waiting.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ActionButton icon={<ArrowUpRight size={16} />} size="lg" to="/contact">
                Book a visit
              </ActionButton>
              <ActionButton icon={<Wrench size={15} />} size="lg" to="/financing" variant="outline">
                Explore finance
              </ActionButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
