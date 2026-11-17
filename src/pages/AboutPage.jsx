import { useRef } from 'react'
import { ArrowRight, ArrowUpRight, Compass, Heart, MapPin, Sparkles, Star } from 'lucide-react'
import ActionButton from '../components/ActionButton.jsx'
import OrbitShowcase from '../components/OrbitShowcase.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { useGsapPage } from '../hooks/useGsapPage.js'

const values = [
  { icon: Heart, title: 'People before horsepower', text: 'A great car matters. Feeling good about the people you bought it from matters more.' },
  { icon: Compass, title: 'A point of view, not a warehouse', text: 'We choose every car ourselves. If it does not make us look twice, it does not make the collection.' },
  { icon: Sparkles, title: 'The little things, properly done', text: 'Honest details, thoughtful handovers, and a coffee that is always on us.' },
]

const timeline = [
  { year: '2013', title: 'A kitchen table and a list', text: 'Elena started sourcing cars for friends. Six cars in the first year, all sold by word of mouth.' },
  { year: '2017', title: 'The Shoreline showroom', text: 'We opened the doors in Malibu with space for eight cars — deliberately small, deliberately considered.' },
  { year: '2021', title: 'Finance in-house', text: 'Tired of buyers being passed around, we built our own finance desk and a seven-day exchange promise.' },
  { year: '2026', title: 'Still deliberately small', text: 'Eight cars, one team, and over 120 owners who still call us first when the next one comes along.' },
]

const team = [
  { name: 'Elena Marsh', role: 'Founder & Head of Buying', bio: 'Twenty years around performance cars, and still the first to arrive when a delivery lands.' },
  { name: 'Raj Patel', role: 'Finance & Ownership', bio: 'Makes the numbers make sense. Known for talking people out of cars they do not need.' },
  { name: 'Tomás Rivera', role: 'Workshop & Preparation', bio: 'Runs the 180-point inspection. If a car is not right, Tomás is the one who says so.' },
]

function AboutPage() {
  const pageRef = useRef(null)
  useGsapPage(pageRef)

  return (
    <main className="bg-page" ref={pageRef}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="on-dark relative flex min-h-[560px] items-end overflow-hidden px-5 pb-14 pt-28 sm:min-h-[640px] sm:px-8 sm:pb-20 lg:px-14">
        <div aria-hidden className="story-photo absolute inset-0" data-hero-bg />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#080a0e] via-[#080a0e]/40 to-transparent" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(90%_80%_at_80%_10%,rgba(79,140,255,0.2),transparent_60%)]" />
        <div className="relative z-10 mx-auto w-full max-w-[1440px]">
          <p className="eyebrow flex items-center gap-3" data-hero-fade>
            <span aria-hidden className="h-px w-8 bg-[#4f8cff]/70" />
            A little about us
          </p>
          <h1 className="display-font mt-5 max-w-3xl text-6xl leading-[0.98] sm:text-7xl lg:text-[5.5rem]">
            <span className="-mb-2 block overflow-hidden pb-2">
              <span className="inline-block" data-hero-word>For the love</span>
            </span>
            <span className="-mb-2 block overflow-hidden pb-2">
              <span className="inline-block" data-hero-word>
                of the <span className="text-gradient">drive.</span>
              </span>
            </span>
          </h1>
          <p className="mt-5 flex items-center gap-2 text-xs text-subtle" data-hero-fade>
            <MapPin className="text-accent" size={14} /> Malibu, California · Est. 2013
          </p>
        </div>
      </section>

      {/* ── Story ────────────────────────────────────────────── */}
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <SectionHeading eyebrow="The story behind the sign" title={<>We started<br />with one simple<br />thought.</>} />
          <div className="max-w-2xl">
            <p className="display-font text-2xl leading-snug text-ink sm:text-3xl">
              Buying a car you love should feel like the beginning of something, not just another transaction.
            </p>
            <p className="mt-7 text-sm leading-8 text-muted">
              Sohail Motor House began around a kitchen table with a handful of car people and a shared belief: the very best part of a beautiful car is the feeling it gives you. We set out to build a motor house around that feeling — somewhere you can take your time, ask anything, and find the car that feels like yours.
            </p>
            <p className="mt-5 text-sm leading-8 text-muted">
              Today, our little corner of Malibu brings together remarkable cars and the people who appreciate them. The cars change. The welcome never does.
            </p>
            <p className="mt-8 border-l-2 border-[#4f8cff]/60 pl-5 text-base text-accent-soft">
              Come as you are. Leave inspired.
            </p>
          </div>
        </div>
      </section>

      {/* ── Numbers ──────────────────────────────────────────── */}
      <section className="border-y border-line bg-soft">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 divide-y divide-line px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-14">
          {[
            { value: 120, suffix: '+', label: 'Cars placed with owners' },
            { value: 12, suffix: ' yrs', label: 'On the Pacific Coast' },
            { value: 4.9, decimals: 1, label: 'Average owner rating', star: true },
          ].map((stat) => (
            <div className="gsap-reveal flex flex-col items-start gap-1 py-9 sm:items-center sm:py-12" key={stat.label}>
              <span className="display-font flex items-center gap-2 text-4xl text-ink sm:text-5xl">
                <span
                  data-counter={stat.value}
                  data-decimals={stat.decimals ?? 0}
                  data-suffix={stat.suffix ?? ''}
                >
                  {`${stat.value}${stat.suffix ?? ''}`}
                </span>
                {stat.star && <Star className="text-accent" fill="currentColor" size={18} />}
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-dim">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────── */}
      <section className="grid-lines px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading
            description="Small by design. Every year has been about getting better, not bigger."
            eyebrow="The road so far"
            title="Twelve years, one standard."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4" data-reveal-group>
            {timeline.map((mile, index) => (
              <article className="relative rounded-2xl border border-line bg-surface p-6" data-reveal-item key={mile.year}>
                <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-[#4f8cff] to-transparent" />
                <p className="display-font text-2xl text-accent-soft">{mile.year}</p>
                <h3 className="mt-4 text-sm font-medium text-ink">{mile.title}</h3>
                <p className="mt-2 text-xs leading-6 text-muted">{mile.text}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.16em] text-faint">
                  Chapter 0{index + 1} <ArrowUpRight size={11} />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────── */}
      <section className="border-y border-line bg-soft px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading
            description="Three things we come back to, every single day."
            eyebrow="What we believe"
            title="It should feel different."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3" data-reveal-group>
            {values.map(({ icon: Icon, title, text }, index) => (
              <article className="surface-card group relative overflow-hidden p-7" data-reveal-item key={title}>
                <span className="display-font absolute right-6 top-5 text-4xl text-ink/[0.06]">0{index + 1}</span>
                <span className="icon-tile"><Icon size={20} strokeWidth={1.5} /></span>
                <h3 className="mt-6 text-lg font-medium text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Orbit ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-soft px-5 py-20 sm:px-8 sm:py-24 lg:px-14">
        <div aria-hidden className="grid-lines absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-[1280px]">
          <SectionHeading
            align="center"
            description="A slow orbit through the eight cars on the floor right now. Hover to pause, click to bring one forward."
            eyebrow="On the floor today"
            title="The collection, in motion."
          />
          <div className="mt-14">
            <OrbitShowcase />
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────── */}
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              description="Nine people, one small showroom. You will meet the same faces from first message to handover."
              eyebrow="The people"
              title="The ones who make it happen."
            />
            <ActionButton icon={<ArrowUpRight size={15} />} size="sm" to="/contact" variant="ghost">
              Come and meet us
            </ActionButton>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3" data-reveal-group>
            {team.map((person) => (
              <article className="surface-card overflow-hidden" data-reveal-item key={person.name}>
                <div className="relative flex h-40 items-center justify-center bg-[radial-gradient(120%_120%_at_50%_0%,#1c3568_0%,#0d1420_70%)]">
                  <div aria-hidden className="grid-lines absolute inset-0 opacity-40" />
                  <span className="display-font relative grid size-20 place-items-center rounded-full border border-[#4f8cff]/30 bg-base/70 text-2xl text-accent-soft">
                    {person.name.split(' ').map((part) => part[0]).join('')}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-base font-medium text-ink">{person.name}</h3>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-accent">{person.role}</p>
                  <p className="mt-3 text-sm leading-6 text-muted">{person.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-14">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 rounded-[32px] border border-line bg-surface px-6 py-10 sm:px-12 sm:py-12 lg:flex-row lg:items-center">
          <div>
            <p className="eyebrow">The door is open</p>
            <h2 className="display-font mt-4 text-4xl sm:text-5xl">Come see what moves you.</h2>
            <p className="mt-3 text-sm text-muted">Coffee is on, the driveway is usually interesting, and there is no pressure to buy.</p>
          </div>
          <ActionButton icon={<ArrowRight size={15} />} size="lg" to="/contact">
            Plan a visit
          </ActionButton>
        </div>
      </section>

      <section className="border-t border-line bg-soft px-5 py-16 sm:px-8 sm:py-20 lg:px-14">
        <div className="mx-auto grid max-w-[1440px] gap-8 rounded-[28px] border border-line bg-surface p-6 sm:p-9 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="eyebrow">A note from our house</p>
            <h2 className="display-font mt-4 max-w-2xl text-3xl leading-tight text-ink sm:text-4xl">
              You are never just another name on a sales sheet.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
              We remember the little things: the road you want to take, the
              sound you love, and what matters most when you hand over the keys.
            </p>
          </div>
          <ActionButton icon={<ArrowRight size={15} />} to="/contact">
            Meet us in person
          </ActionButton>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
