import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Calculator,
  Check,
  ChevronDown,
  Clock3,
  FileCheck2,
  Percent,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import ActionButton from '../components/ActionButton.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { cars, formatCurrency, getCarById } from '../data/cars.js'
import { useGsapPage } from '../hooks/useGsapPage.js'

const benefits = [
  { icon: Percent, title: 'Rates from 5.9% APR', text: 'We work with a panel of specialist lenders, so the rate is based on the car and your circumstances — not a poster in the window.' },
  { icon: Clock3, title: 'Decision in 20 minutes', text: 'A soft search first, so nothing touches your credit file until you are ready to proceed.' },
  { icon: FileCheck2, title: 'Part exchange built in', text: 'Put your current car towards the deposit. We value it on the spot and handle the transfer.' },
]

const steps = [
  { title: 'Choose the car', text: 'Pick anything in the collection. We will hold it for 48 hours while you decide.' },
  { title: 'Set your terms', text: 'Deposit, term, and monthly budget. Adjust any of them without starting over.' },
  { title: 'Drive away', text: 'Sign digitally, collect the keys, and we will take care of the registration.' },
]

const faqs = [
  {
    question: 'Will checking my rate affect my credit score?',
    answer: 'No. The first step is a soft search, which is visible only to you. A hard search happens only once you decide to proceed with a specific agreement.',
  },
  {
    question: 'Can I settle the finance early?',
    answer: 'Yes. You can request a settlement figure at any time, and there are no early repayment penalties on our standard agreements.',
  },
  {
    question: 'Do you take my current car as a deposit?',
    answer: 'We do. Send us the registration and mileage, and we will value it within 24 hours. The equity goes straight towards your deposit.',
  },
  {
    question: 'What deposit do I need?',
    answer: 'Most of our buyers put down between 10% and 30%. There is no fixed minimum on many of our lender options, though a larger deposit usually lowers the monthly payment.',
  },
  {
    question: 'Is the car insured while it is financed?',
    answer: 'You will need your own comprehensive insurance from the day you collect. We can introduce you to a specialist broker if you would like a quote.',
  },
]

function FinancingPage() {
  const [searchParams] = useSearchParams()
  const requestedCar = getCarById(searchParams.get('car')) ?? cars[0]
  const [carId, setCarId] = useState(requestedCar.id)
  const [downPercent, setDownPercent] = useState(20)
  const [term, setTerm] = useState(60)
  const [apr, setApr] = useState(6.9)
  const [openFaq, setOpenFaq] = useState(0)
  const pageRef = useRef(null)
  useGsapPage(pageRef)

  const car = getCarById(carId) ?? cars[0]
  const price = car.priceValue
  const deposit = Math.round((price * downPercent) / 100)
  const principal = Math.max(price - deposit, 0)
  const monthlyRate = apr / 100 / 12
  const monthly = monthlyRate
    ? (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term))
    : principal / term
  const totalPaid = monthly * term
  const totalInterest = totalPaid - principal

  return (
    <main className="bg-page" ref={pageRef}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line bg-soft px-5 py-20 sm:px-8 sm:py-24 lg:px-14">
        <div aria-hidden className="grid-lines absolute inset-0 opacity-50" />
        <div aria-hidden className="absolute -left-40 top-0 size-[460px] rounded-full bg-[#4f8cff]/12 blur-[130px]" />
        <div className="relative mx-auto max-w-[1440px]">
          <p className="eyebrow flex items-center gap-3" data-hero-fade>
            <span aria-hidden className="h-px w-8 bg-[#4f8cff]/70" />
            Finance, without the headache
          </p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <h1 className="display-font text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
              <span className="-mb-2 block overflow-hidden pb-2">
                <span className="inline-block" data-hero-word>Own the drive,</span>
              </span>
              <span className="-mb-2 block overflow-hidden pb-2">
                <span className="inline-block" data-hero-word>
                  not the <span className="text-gradient">wait.</span>
                </span>
              </span>
            </h1>
            <p className="max-w-md text-sm leading-7 text-muted" data-hero-fade>
              Clear numbers, soft searches, and no pressure. Move the sliders to see what a car actually costs per month — then come and talk to a person.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-xs text-muted" data-hero-fade>
            <span className="inline-flex items-center gap-2"><Check className="text-accent" size={14} /> No hard credit check to start</span>
            <span className="inline-flex items-center gap-2"><Check className="text-accent" size={14} /> Rates from 5.9% APR</span>
            <span className="inline-flex items-center gap-2"><Check className="text-accent" size={14} /> Early settlement, no penalty</span>
          </div>
        </div>
      </section>

      {/* ── Calculator ───────────────────────────────────────── */}
      <section className="px-5 py-16 sm:px-8 lg:px-14 lg:py-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-start">
            <div className="surface-card gsap-reveal p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="icon-tile"><Calculator size={19} /></span>
                <div>
                  <h2 className="text-lg font-medium text-ink">Payment calculator</h2>
                  <p className="text-xs text-dim">Estimate only. Final terms depend on the lender.</p>
                </div>
              </div>

              <div className="mt-8 space-y-8">
                <div>
                  <label className="text-xs text-subtle" htmlFor="finance-car">Choose a car</label>
                  <select
                    className="form-field mt-2"
                    id="finance-car"
                    onChange={(event) => setCarId(event.target.value)}
                    value={carId}
                  >
                    {cars.map((item) => (
                      <option key={item.id} value={item.id}>{`${item.name} — ${item.price}`}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex items-end justify-between">
                    <label className="text-xs text-subtle" htmlFor="finance-down">Deposit</label>
                    <span className="text-xs text-accent-soft">{downPercent}% · {formatCurrency(deposit)}</span>
                  </div>
                  <input
                    aria-label="Deposit percentage"
                    id="finance-down"
                    max="50"
                    min="0"
                    onChange={(event) => setDownPercent(Number(event.target.value))}
                    step="1"
                    style={{ '--fill': `${(downPercent / 50) * 100}%` }}
                    type="range"
                    value={downPercent}
                  />
                  <div className="mt-1.5 flex justify-between text-[10px] text-faint">
                    <span>0%</span>
                    <span>50%</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-subtle">Term</p>
                  <div className="mt-2 grid grid-cols-5 gap-2" role="group" aria-label="Finance term in months">
                    {[36, 48, 60, 72, 84].map((months) => (
                      <button
                        aria-pressed={term === months}
                        className={`rounded-full border px-2 py-2.5 text-[11px] transition ${
                          term === months
                            ? 'border-transparent bg-gradient-to-r from-[#a8c6ff] to-[#4f8cff] font-semibold text-[#050a15]'
                            : 'border-line text-muted hover:border-line-strong hover:text-ink'
                        }`}
                        key={months}
                        onClick={() => setTerm(months)}
                        type="button"
                      >
                        {months}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-end justify-between">
                    <label className="text-xs text-subtle" htmlFor="finance-apr">APR</label>
                    <span className="text-xs text-accent-soft">{apr.toFixed(1)}%</span>
                  </div>
                  <input
                    aria-label="Annual percentage rate"
                    id="finance-apr"
                    max="12"
                    min="3"
                    onChange={(event) => setApr(Number(event.target.value))}
                    step="0.1"
                    style={{ '--fill': `${((apr - 3) / 9) * 100}%` }}
                    type="range"
                    value={apr}
                  />
                  <div className="mt-1.5 flex justify-between text-[10px] text-faint">
                    <span>3%</span>
                    <span>12%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="gsap-reveal lg:sticky lg:top-24">
              <div className="on-dark relative overflow-hidden rounded-[28px] border border-[#4f8cff]/25 bg-[radial-gradient(130%_130%_at_0%_0%,#173a84_0%,#0d1b38_48%,#0a0e16_100%)] p-6 sm:p-8">
                <div aria-hidden className="absolute -right-16 -top-16 size-[240px] rounded-full bg-[#4f8cff]/25 blur-[80px]" />
                <div className="relative z-10">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-accent-soft">Estimated monthly</p>
                  <div className="mt-2 flex items-end gap-1">
                    <span className="display-font text-5xl text-ink sm:text-6xl">
                      {formatCurrency(monthly)}
                    </span>
                    <span className="pb-2 text-sm text-muted">/mo</span>
                  </div>
                  <p className="mt-3 text-xs text-subtle">{car.name} · {term} months · {apr.toFixed(1)}% APR</p>

                  <dl className="mt-7 space-y-3 border-t border-line pt-5 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted">Car price</dt>
                      <dd className="text-ink">{formatCurrency(price)}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted">Deposit</dt>
                      <dd className="text-ink">− {formatCurrency(deposit)}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted">Amount financed</dt>
                      <dd className="text-ink">{formatCurrency(principal)}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted">Total interest</dt>
                      <dd className="text-ink">{formatCurrency(totalInterest)}</dd>
                    </div>
                    <div className="flex justify-between gap-4 border-t border-line pt-3">
                      <dt className="text-subtle">Total payable</dt>
                      <dd className="font-semibold text-accent-soft">{formatCurrency(totalPaid + deposit)}</dd>
                    </div>
                  </dl>

                  <ActionButton className="mt-7 w-full" icon={<ArrowUpRight size={15} />} to={`/contact?car=${car.id}`}>
                    Get a real quote
                  </ActionButton>
                  <p className="mt-4 flex items-start gap-2 text-[10px] leading-5 text-dim">
                    <ShieldCheck className="mt-0.5 shrink-0 text-accent" size={13} />
                    Representative example. Subject to status and lender approval. Sohail Motor House is a credit broker, not a lender.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────── */}
      <section className="border-y border-line bg-soft px-5 py-20 sm:px-8 sm:py-24 lg:px-14">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading
            description="No mystery fees, no pressure to sign. Just straightforward finance from people who do this every day."
            eyebrow="Why finance with us"
            title="Numbers you can actually read."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3" data-reveal-group>
            {benefits.map(({ icon: Icon, title, text }) => (
              <article className="surface-card group p-7" data-reveal-item key={title}>
                <span className="icon-tile"><Icon size={20} strokeWidth={1.6} /></span>
                <h3 className="mt-6 text-lg font-medium text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Steps ────────────────────────────────────────────── */}
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-14">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading
              description="Three steps, one conversation, and no sitting around while somebody talks to a manager."
              eyebrow="How it works"
              title="Simple from start to keys."
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <ActionButton icon={<Calculator size={15} />} to="/inventory" variant="outline">
                Browse the cars
              </ActionButton>
              <ActionButton icon={<ArrowRight size={15} />} to="/contact" variant="ghost">
                Ask a question
              </ActionButton>
            </div>
          </div>
          <ol className="space-y-4" data-reveal-group>
            {steps.map((step, index) => (
              <li className="flex gap-5 rounded-2xl border border-line bg-surface p-5 sm:p-6" data-reveal-item key={step.title}>
                <span className="display-font grid size-10 shrink-0 place-items-center rounded-full bg-[#4f8cff]/12 text-sm text-accent-soft">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-base font-medium text-ink">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="border-t border-line bg-soft px-5 py-20 sm:px-8 sm:py-24 lg:px-14">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <SectionHeading
            description="Still unsure? Call us on +1 (310) 555-0184 and ask for the finance desk."
            eyebrow="Good questions"
            title="Finance, answered."
          />
          <div className="divide-y divide-line border-y border-line">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div key={faq.question}>
                  <button
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-sm font-medium text-ink transition hover:text-ink"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    type="button"
                  >
                    {faq.question}
                    <ChevronDown className={`shrink-0 text-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={17} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        animate={{ height: 'auto', opacity: 1 }}
                        className="overflow-hidden"
                        exit={{ height: 0, opacity: 0 }}
                        initial={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 0.8, 0.28, 1] }}
                      >
                        <p className="pb-5 pr-8 text-sm leading-7 text-muted">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-14">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 rounded-[32px] border border-line bg-surface px-6 py-10 sm:px-12 sm:py-12 lg:flex-row lg:items-center">
          <div className="flex max-w-xl items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#4f8cff]/12 text-accent-soft">
              <Banknote size={20} />
            </span>
            <div>
              <h2 className="display-font text-2xl leading-tight sm:text-3xl">Prefer to talk it through?</h2>
              <p className="mt-2 text-sm leading-7 text-muted">
                Book twenty minutes with the finance desk. Bring your questions — and your current car, if you are trading.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <ActionButton icon={<Sparkles size={15} />} to="/contact">
              Book a finance call
            </ActionButton>
            <ActionButton icon={<ArrowRight size={15} />} to="/inventory" variant="outline">
              See the cars
            </ActionButton>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-soft px-5 py-16 sm:px-8 sm:py-20 lg:px-14">
        <div className="mx-auto grid max-w-[1440px] gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-2xl">
            <p className="eyebrow">A clear road ahead</p>
            <h2 className="display-font mt-4 text-4xl leading-tight text-ink sm:text-5xl">
              Your estimate is a starting point, not a commitment.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              We will explain the options, answer every question, and give you
              room to decide. No application goes ahead until you are ready.
            </p>
          </div>
          <ActionButton icon={<ArrowRight size={15} />} size="lg" to="/contact">
            Talk it through
          </ActionButton>
        </div>
      </section>
    </main>
  )
}

export default FinancingPage
