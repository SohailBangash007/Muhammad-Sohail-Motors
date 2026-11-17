import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Check, Heart, RotateCcw, Search, ShieldCheck, SlidersHorizontal, Truck, Wrench } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ActionButton from '../components/ActionButton.jsx'
import BookShelf from '../components/BookShelf.jsx'
import CarCard from '../components/CarCard.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { cars } from '../data/cars.js'
import { useGsapPage } from '../hooks/useGsapPage.js'
import { gsap, prefersReducedMotion } from '../lib/animations.js'
import { useSavedCars } from '../lib/savedCars.js'

const categories = ['All cars', 'Coupe', 'Supercar', 'Convertible']
const budgets = [
  { label: 'Any budget', value: 0 },
  { label: 'Up to $100k', value: 100000 },
  { label: 'Up to $150k', value: 150000 },
  { label: 'Up to $200k', value: 200000 },
  { label: 'Up to $300k', value: 300000 },
]
const sortOptions = [
  { label: 'Featured first', value: 'featured' },
  { label: 'Price: low to high', value: 'price-asc' },
  { label: 'Price: high to low', value: 'price-desc' },
  { label: 'Newest first', value: 'year-desc' },
  { label: 'Lowest mileage', value: 'mileage-asc' },
]

const promises = [
  { icon: ShieldCheck, title: '180-point inspection', text: 'Every car is checked nose to tail by our own technicians before it reaches the floor.' },
  { icon: Wrench, title: 'Seven-day exchange', text: 'Live with it for a week. If it is not the one, bring it back and we will find the right one.' },
  { icon: Truck, title: 'Delivered to your door', text: 'Enclosed, insured transport anywhere in the country — usually within four working days.' },
]

function InventoryPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { saved } = useSavedCars()
  const [category, setCategory] = useState(() => {
    const type = searchParams.get('type')
    return categories.includes(type) ? type : 'All cars'
  })
  const [maxPrice, setMaxPrice] = useState(() => Number(searchParams.get('max')) || 0)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('featured')
  const [savedOnly, setSavedOnly] = useState(false)
  const pageRef = useRef(null)
  const gridRef = useRef(null)
  const filterRef = useRef(null)
  const firstRender = useRef(true)

  useGsapPage(pageRef)

  const filteredCars = useMemo(() => {
    const query = search.toLowerCase().trim()
    const result = cars.filter((car) => {
      const matchesCategory = category === 'All cars' || car.category === category
      const matchesBudget = !maxPrice || car.priceValue <= maxPrice
      const matchesSearch = `${car.name} ${car.year} ${car.category}`.toLowerCase().includes(query)
      const matchesSaved = !savedOnly || saved.includes(car.id)
      return matchesCategory && matchesBudget && matchesSearch && matchesSaved
    })

    return result.sort((a, b) => {
      if (sort === 'price-asc') return a.priceValue - b.priceValue
      if (sort === 'price-desc') return b.priceValue - a.priceValue
      if (sort === 'year-desc') return b.year - a.year
      if (sort === 'mileage-asc') return a.mileageValue - b.mileageValue
      return 0
    })
  }, [category, maxPrice, search, sort, savedOnly, saved])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const grid = gridRef.current
    if (!grid || prefersReducedMotion()) return
    const cards = grid.querySelectorAll(':scope > *')
    if (!cards.length) return
    gsap.fromTo(
      cards,
      { y: 26, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.55, ease: 'power3.out', stagger: 0.05, overwrite: 'auto' },
    )
  }, [filteredCars])

  function resetFilters() {
    setCategory('All cars')
    setMaxPrice(0)
    setSearch('')
    setSort('featured')
    setSavedOnly(false)
    navigate('/inventory', { replace: true })
  }

  return (
    <main className="min-h-screen bg-page" ref={pageRef}>
      <section className="relative overflow-hidden border-b border-line bg-soft px-5 py-20 sm:px-8 sm:py-24 lg:px-14">
        <div aria-hidden className="grid-lines absolute inset-0 opacity-50" />
        <div aria-hidden className="absolute -right-40 -top-40 size-[460px] rounded-full bg-[#4f8cff]/12 blur-[120px]" />
        <div className="relative mx-auto max-w-[1440px]">
          <p className="eyebrow flex items-center gap-3" data-hero-fade>
            <span aria-hidden className="h-px w-8 bg-[#4f8cff]/70" />
            Selected with intention
          </p>
          <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h1 className="display-font text-6xl leading-[0.98] sm:text-7xl">
              <span className="-mb-2 block overflow-hidden pb-2">
                <span className="inline-block" data-hero-word>The collection.</span>
              </span>
            </h1>
            <p className="max-w-md text-sm leading-7 text-muted" data-hero-fade>
              Every car has a story. These are the ones waiting to meet you — inspected, photographed, and ready to drive.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-9 gap-y-4 text-xs text-muted" data-hero-fade>
            <span>
              <span className="display-font text-lg text-ink" data-counter={String(cars.length)} data-prefix="0">{`0${cars.length}`}</span>{' '}
              considered cars
            </span>
            <span>Always changing, never ordinary</span>
            <span className="inline-flex items-center gap-2 text-accent-soft">
              <Check size={14} /> Every car sold with a 7-day exchange
            </span>
          </div>
        </div>
      </section>

      {/* ── Chapters ─────────────────────────────────────────── */}
      <section className="border-b border-line bg-soft px-5 py-16 sm:px-8 sm:py-20 lg:px-14">
        <div className="mx-auto max-w-[1440px]">
          <BookShelf
            eyebrow="Browse by chapter"
            onSelect={(type) => {
              setCategory(type)
              filterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            title="Start with a feeling."
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-12 sm:px-8 lg:px-14 lg:py-16" ref={filterRef}>
        <div className="flex flex-col gap-5 border-b border-line pb-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex items-center gap-2 text-xs text-dim">
              <SlidersHorizontal size={15} />
              Find your kind of drive
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="flex items-center gap-2 rounded-full border border-line bg-tint px-4 py-2.5 text-muted transition focus-within:border-[#4f8cff]/70 focus-within:shadow-[0_0_0_3px_rgba(79,140,255,0.12)]">
                <Search size={15} />
                <input
                  aria-label="Search cars"
                  className="w-full bg-transparent text-xs text-ink outline-none placeholder:text-faint sm:w-40"
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search collection"
                  value={search}
                />
              </label>
              <label className="sr-only" htmlFor="inventory-sort">Sort cars</label>
              <select
                className="rounded-full border border-line bg-surface px-4 py-2.5 text-xs text-subtle outline-none transition hover:border-line-strong focus:border-[#4f8cff]"
                id="inventory-sort"
                onChange={(event) => setSort(event.target.value)}
                value={sort}
              >
                {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
            <div aria-label="Filter cars by type" className="flex flex-wrap gap-2" role="group">
              {categories.map((item) => (
                <button aria-pressed={category === item} className="chip" key={item} onClick={() => setCategory(item)} type="button">
                  {item}
                </button>
              ))}
              <button
                aria-pressed={savedOnly}
                className="chip inline-flex items-center gap-2"
                onClick={() => setSavedOnly((value) => !value)}
                type="button"
              >
                <Heart fill={savedOnly ? 'currentColor' : 'none'} size={12} />
                Saved{saved.length > 0 ? ` (${saved.length})` : ''}
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {budgets.map((budget) => (
                <button
                  aria-pressed={maxPrice === budget.value}
                  className="chip !px-3 !py-2 text-[10px]"
                  key={budget.value}
                  onClick={() => setMaxPrice(budget.value)}
                  type="button"
                >
                  {budget.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div aria-live="polite" className="mt-7 flex flex-wrap items-center justify-between gap-2 text-xs text-dim">
          <span>Showing {filteredCars.length} {filteredCars.length === 1 ? 'car' : 'cars'}</span>
          <span>Thoughtfully sourced. Ready for the road.</span>
        </div>

        {filteredCars.length > 0 ? (
          <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group ref={gridRef}>
            {filteredCars.map((car) => <CarCard car={car} key={car.id} />)}
          </div>
        ) : (
          <div className="mt-6 rounded-[28px] border border-line bg-surface px-6 py-20 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-full border border-[#4f8cff]/30 bg-[#4f8cff]/10 text-accent-soft">
              <Search size={20} />
            </span>
            <h2 className="display-font mt-5 text-3xl">Nothing in the garage just yet.</h2>
            <p className="mt-3 text-sm text-muted">Try a different search, budget, or body style.</p>
            <ActionButton className="mt-7" icon={<RotateCcw size={14} />} onClick={resetFilters} size="sm" variant="outline">
              Reset the filters
            </ActionButton>
          </div>
        )}
      </section>

      {/* ── Buying promises ──────────────────────────────────── */}
      <section className="border-t border-line bg-soft px-5 py-20 sm:px-8 sm:py-24 lg:px-14">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading
            description="The part most showrooms skip. We build the whole thing around it."
            eyebrow="Buy with confidence"
            title="Every car, backed properly."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3" data-reveal-group>
            {promises.map(({ icon: Icon, title, text }) => (
              <article className="surface-card group p-7" data-reveal-item key={title}>
                <span className="icon-tile"><Icon size={20} strokeWidth={1.6} /></span>
                <h3 className="mt-6 text-lg font-medium text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sell / trade ─────────────────────────────────────── */}
      <section className="bg-page px-5 py-20 sm:px-8 sm:py-24 lg:px-14">
        <div className="on-dark relative mx-auto max-w-[1440px] overflow-hidden rounded-[32px] border border-[#4f8cff]/25 bg-[radial-gradient(120%_140%_at_0%_0%,#1a3f8f_0%,#0d1b38_45%,#0a0e16_100%)] px-6 py-12 sm:px-12 sm:py-16">
          <div aria-hidden className="absolute -right-20 -top-20 size-[320px] rounded-full bg-[#4f8cff]/25 blur-[100px]" />
          <div className="relative z-10 flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="eyebrow">Sell or trade in</p>
              <h2 className="display-font mt-4 text-4xl leading-[1.05] text-ink sm:text-5xl">
                Your current car is worth more than you think.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-subtle">
                Send us the details and we will come back within 24 hours with a real, no-obligation offer. We buy outright and take trades against anything in the collection.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <ActionButton icon={<ArrowUpRight size={15} />} to="/contact">
                  Get a valuation
                </ActionButton>
                <ActionButton icon={<ArrowRight size={15} />} to="/financing" variant="outline">
                  See finance options
                </ActionButton>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-subtle">
              {['Free, no-obligation valuation', 'Paid within one working day', 'We handle the paperwork', 'Trade against any car in stock'].map((item) => (
                <li className="flex items-center gap-2.5" key={item}>
                  <span className="grid size-5 place-items-center rounded-full bg-[#4f8cff]/20 text-accent-soft">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-soft px-5 py-20 sm:px-8 sm:py-24 lg:px-14">
        <div className="mx-auto grid max-w-[1440px] gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-2xl">
            <p className="eyebrow">Take your time</p>
            <h2 className="display-font mt-4 text-4xl leading-tight text-ink sm:text-5xl">
              The right car is worth a closer look.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              Ask us for the full history, arrange an independent inspection, or
              book a drive. We will make sure you have what you need to choose
              with confidence.
            </p>
          </div>
          <ActionButton icon={<ArrowUpRight size={15} />} size="lg" to="/contact">
            Talk to our team
          </ActionButton>
        </div>
      </section>
    </main>
  )
}

export default InventoryPage
