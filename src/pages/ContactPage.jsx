import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Check,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import ActionButton from '../components/ActionButton.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { getCarById } from '../data/cars.js'
import { useGsapPage } from '../hooks/useGsapPage.js'

const faqs = [
  {
    question: 'Do I need an appointment to visit?',
    answer: 'Not at all — the door is open Tuesday to Saturday, 10am to 6pm. If there is a specific car you want to see, a quick note means we can have it out front and ready.',
  },
  {
    question: 'Can I drive a car before deciding?',
    answer: 'Yes, and we would rather you did. Test drives are unaccompanied on a route we know well, and you can take as long as you need.',
  },
  {
    question: 'Do you take part exchange?',
    answer: 'We do. Send the registration, mileage, and a couple of photos, and our buying team will come back within 24 hours with a real offer.',
  },
  {
    question: 'Can you deliver outside California?',
    answer: 'Yes. We ship nationwide in enclosed, insured transport, usually within four working days. We will keep you updated from collection to driveway.',
  },
]

const visitPoints = [
  'Plenty of parking, right off the PCH',
  'Coffee, cold drinks, and somewhere to sit',
  'Full history files available to read',
  'No pressure, no follow-up calls you did not ask for',
]

function ContactPage() {
  const [searchParams] = useSearchParams()
  const car = getCarById(searchParams.get('car'))
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const pageRef = useRef(null)
  useGsapPage(pageRef)

  function handleSubmit(event) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <main className="bg-page" ref={pageRef}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="on-dark relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
        <div aria-hidden className="contact-photo absolute inset-0" data-hero-bg />
        <div aria-hidden className="contact-shade absolute inset-0" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(80%_80%_at_85%_20%,rgba(79,140,255,0.18),transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-[1440px]">
          <p className="eyebrow flex items-center gap-3" data-hero-fade>
            <span aria-hidden className="h-px w-8 bg-[#4f8cff]/70" />
            We would love to meet you
          </p>
          <h1 className="display-font mt-5 max-w-3xl text-6xl leading-[0.98] sm:text-7xl lg:text-[5.5rem]">
            <span className="-mb-2 block overflow-hidden pb-2">
              <span className="inline-block" data-hero-word>Good things</span>
            </span>
            <span className="-mb-2 block overflow-hidden pb-2">
              <span className="inline-block" data-hero-word>
                start with <span className="text-gradient">hello.</span>
              </span>
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-7 text-subtle sm:text-base" data-hero-fade>
            Questions about a car? Looking to find your next one? Or just passing through. Our door is open.
          </p>
          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-xs text-subtle" data-hero-fade>
            <span className="inline-flex items-center gap-2"><Clock3 className="text-accent" size={14} /> Replies within one working day</span>
            <span className="inline-flex items-center gap-2"><Phone className="text-accent" size={14} /> +1 (310) 555-0184</span>
          </div>
        </div>
      </section>

      {/* ── Contact + form ───────────────────────────────────── */}
      <section className="mx-auto grid max-w-[1440px] gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-14">
        <div>
          <p className="eyebrow">The motor house</p>
          <h2 className="display-font mt-4 text-4xl">Make yourself at home.</h2>
          <div className="mt-9 space-y-7" data-reveal-group>
            <div className="flex gap-4" data-reveal-item>
              <span className="icon-tile !size-10 shrink-0"><MapPin size={16} /></span>
              <div>
                <p className="text-sm font-medium text-ink">Find us</p>
                <p className="mt-2 text-sm leading-6 text-muted">1188 Shoreline Drive<br />Malibu, CA 90265</p>
              </div>
            </div>
            <div className="flex gap-4" data-reveal-item>
              <span className="icon-tile !size-10 shrink-0"><Clock3 size={16} /></span>
              <div>
                <p className="text-sm font-medium text-ink">When we are here</p>
                <p className="mt-2 text-sm leading-6 text-muted">Tuesday – Saturday<br />10:00 am – 6:00 pm</p>
              </div>
            </div>
            <div className="flex gap-4" data-reveal-item>
              <span className="icon-tile !size-10 shrink-0"><Phone size={16} /></span>
              <div>
                <p className="text-sm font-medium text-ink">Give us a ring</p>
                <a className="mt-2 block text-sm text-muted transition hover:text-accent-soft" href="tel:+13105550184">
                  +1 (310) 555-0184
                </a>
              </div>
            </div>
            <div className="flex gap-4" data-reveal-item>
              <span className="icon-tile !size-10 shrink-0"><Mail size={16} /></span>
              <div>
                <p className="text-sm font-medium text-ink">Write to us</p>
                <a className="mt-2 block text-sm text-muted transition hover:text-accent-soft" href="mailto:hello@sohailmotorhouse.com">
                  hello@sohailmotorhouse.com
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-line pt-6">
            <p className="text-xs leading-6 text-faint">
              We are just off the Pacific Coast Highway. Plenty of parking, good coffee, and usually something interesting in the driveway.
            </p>
          </div>
        </div>

        <div className="gsap-reveal rounded-[28px] border border-line bg-gradient-to-b from-[var(--c-elevated)] to-[var(--c-surface)] p-6 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.45)] sm:p-9">
          <p className="eyebrow">Drop us a line</p>
          <h2 className="display-font mt-4 text-3xl">What is on your mind?</h2>

          {car && (
            <Link
              className="mt-5 flex items-center gap-3 rounded-2xl border border-[#4f8cff]/30 bg-[#4f8cff]/8 p-3 transition hover:border-[#4f8cff]/60"
              to={`/inventory/${car.id}`}
            >
              <span className="grid size-9 place-items-center rounded-full bg-[#4f8cff]/15 text-accent-soft">
                <Check size={15} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[9px] uppercase tracking-[0.15em] text-dim">Enquiring about</span>
                <span className="block truncate text-sm text-ink">{car.name} · {car.price}</span>
              </span>
              <ArrowUpRight className="shrink-0 text-accent-soft" size={15} />
            </Link>
          )}

          {sent ? (
            <div aria-live="polite" className="success-pop mt-8 rounded-2xl border border-[#4f8cff]/35 bg-[#4f8cff]/8 p-6">
              <span className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-[#a8c6ff] to-[#4f8cff] text-[#050a15]">
                <Check size={20} />
              </span>
              <p className="mt-4 text-lg text-ink">Thanks for reaching out.</p>
              <p className="mt-2 text-sm leading-6 text-subtle">
                Your note is with our team. We will reply within one working day — usually sooner.
              </p>
              <ActionButton className="mt-6" onClick={() => setSent(false)} size="sm" variant="outline">
                Send another message
              </ActionButton>
            </div>
          ) : (
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-xs text-muted">
                  Your name
                  <input autoComplete="name" className="form-field mt-2" name="name" placeholder="How should we call you?" required />
                </label>
                <label className="block text-xs text-muted">
                  Email address
                  <input autoComplete="email" className="form-field mt-2" name="email" placeholder="you@example.com" required type="email" />
                </label>
              </div>
              <label className="block text-xs text-muted">
                I would love to talk about
                <select className="form-field mt-2" defaultValue={car ? 'One of your cars' : ''} name="subject" required>
                  <option disabled value="">Choose a topic</option>
                  <option>One of your cars</option>
                  <option>Booking a test drive</option>
                  <option>Finding my next car</option>
                  <option>Selling or trading my car</option>
                  <option>Visiting the motor house</option>
                  <option>Something else</option>
                </select>
              </label>
              <label className="block text-xs text-muted">
                A little more about it
                <textarea
                  className="form-field mt-2 min-h-32 resize-y"
                  defaultValue={car ? `I would like to know more about the ${car.name}.` : ''}
                  name="message"
                  placeholder="Tell us what you have in mind..."
                  required
                />
              </label>
              <ActionButton icon={<ArrowUpRight size={15} />} type="submit">
                Send your note
              </ActionButton>
              <p className="text-[10px] leading-5 text-faint">
                By sending this you agree to be contacted about your enquiry. No marketing lists, no sharing your details.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="border-t border-line bg-soft px-5 py-20 sm:px-8 sm:py-24 lg:px-14">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <SectionHeading
            description="If your question is not here, the phone is answered by a human."
            eyebrow="Before you visit"
            title="The things people ask."
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

      {/* ── Visit / map ──────────────────────────────────────── */}
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-14">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <div className="relative min-h-[360px] overflow-hidden rounded-[28px] border border-line bg-soft">
            <div aria-hidden className="grid-lines absolute inset-0 opacity-60" />
            <div aria-hidden className="absolute -left-16 top-1/3 h-56 w-[130%] rotate-[-8deg] bg-[#4f8cff]/10 blur-2xl" />
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_45%,rgba(79,140,255,0.22),transparent_65%)]" />
            <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#4f8cff]/50 bg-base/80 text-accent-soft shadow-[0_0_0_12px_rgba(79,140,255,0.08)]">
              <MapPin size={24} />
            </span>
            <div className="absolute left-4 top-4 rounded-full border border-line bg-base/70 px-3 py-2 text-[9px] uppercase tracking-[0.16em] text-subtle backdrop-blur-sm">
              Sohail Motor House
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-base/75 p-4 backdrop-blur-md">
              <div>
                <p className="text-sm font-medium text-ink">1188 Shoreline Drive</p>
                <p className="text-xs text-muted">Malibu, CA 90265 · Off the PCH</p>
              </div>
              <ActionButton icon={<Navigation size={14} />} size="sm" to="/contact" variant="outline">
                Get directions
              </ActionButton>
            </div>
          </div>

          <div className="surface-card flex flex-col justify-center p-7 sm:p-9">
            <p className="eyebrow">Plan the visit</p>
            <h2 className="display-font mt-4 text-3xl leading-tight sm:text-4xl">Make an afternoon of it.</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              We are twenty minutes up the coast from Santa Monica. Come for the cars, stay for the sunset — the driveway is always worth a look.
            </p>
            <ul className="mt-7 space-y-3 text-sm text-subtle">
              {visitPoints.map((point) => (
                <li className="flex items-center gap-2.5" key={point}>
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#4f8cff]/15 text-accent-soft">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ActionButton icon={<CalendarCheck size={15} />} to="/contact">
                Book a time
              </ActionButton>
              <ActionButton icon={<ArrowRight size={15} />} to="/inventory" variant="ghost">
                See what is here
              </ActionButton>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-soft px-5 py-16 sm:px-8 sm:py-20 lg:px-14">
        <div className="mx-auto max-w-[1440px]">
          <p className="eyebrow">Your visit, your way</p>
          <h2 className="display-font mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl">
            No showroom script. Just a good day around good cars.
          </h2>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {[
              ['01', 'Tell us what you love', 'A model in mind, a budget, or just a feeling — any place is a good place to start.'],
              ['02', 'Take your time', 'We will have the keys ready, the history open, and room for every question.'],
              ['03', 'Take the long way home', 'If the car feels right, we will help you make the next steps simple.'],
            ].map(([number, title, text]) => (
              <article className="rounded-2xl border border-line bg-surface p-6" key={number}>
                <span className="display-font text-2xl text-accent-soft">{number}</span>
                <h3 className="mt-5 text-base font-medium text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default ContactPage
