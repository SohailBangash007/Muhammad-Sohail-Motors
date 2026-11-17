import { useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  MapPin,
  Phone,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import ActionButton from './ActionButton.jsx'
import BrandMark from './BrandMark.jsx'

const bugattiImage =
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Bugatti_Chiron_1.jpg/1920px-Bugatti_Chiron_1.jpg'

function Footer() {
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(event) {
    event.preventDefault()
    setSubscribed(true)
  }

  return (
    <footer className="relative overflow-hidden border-t border-line bg-base text-ink">
      <div className="on-dark relative isolate min-h-[390px] overflow-hidden border-b border-line sm:min-h-[440px]">
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 size-full object-cover object-[center_57%]"
          loading="lazy"
          src={bugattiImage}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#05070a] via-[#05070a]/80 to-[#05070a]/15" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#05070a]/70 via-transparent to-[#05070a]/25" />

        <div className="mx-auto flex min-h-[390px] max-w-[1440px] flex-col justify-center px-5 py-16 sm:min-h-[440px] sm:px-8 lg:px-14">
          <p className="eyebrow">Muhammad Sohail Motor House</p>
          <h2 className="display-font mt-5 max-w-2xl text-5xl leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
            Make the next<br />
            drive <span className="italic text-accent-soft">unforgettable.</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-subtle">
            The right car changes the way the road feels. Find the one that feels
            like yours.
          </p>
          <Link
            className="mt-7 inline-flex w-fit items-center gap-3 rounded-full bg-accent px-6 py-3.5 text-xs font-semibold text-[#07101f] shadow-[0_8px_35px_-12px_rgba(79,140,255,0.8)] transition hover:-translate-y-0.5 hover:brightness-110"
            to="/inventory"
          >
            Explore the collection <ArrowUpRight size={15} />
          </Link>
        </div>

        <a
          className="absolute bottom-3 right-5 text-[9px] text-dim transition hover:text-ink sm:right-8 lg:right-14"
          href="https://commons.wikimedia.org/wiki/File:Bugatti_Chiron_1.jpg"
          rel="noreferrer"
          target="_blank"
        >
          Bugatti Chiron · Calreyn88 · CC BY-SA 4.0
        </a>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-11 px-5 py-14 sm:px-8 sm:py-16 md:grid-cols-[1.2fr_0.7fr_1fr_1.35fr] lg:gap-14 lg:px-14 lg:py-20">
        <div>
          <Link
            aria-label="Muhammad Sohail Motor House home"
            className="group inline-flex items-center gap-3 text-ink"
            to="/"
          >
            <BrandMark className="size-10 shrink-0 transition-transform duration-500 group-hover:-rotate-3" />
            <span className="text-[12px] font-semibold tracking-[0.13em] sm:text-[13px]">
              MUHAMMAD SOHAIL
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-7 text-muted">
            Curated sports cars, honest advice, and a little more joy in every
            mile.
          </p>
          <div className="mt-6 flex gap-2">
            {['IG', 'YT', 'X'].map((social) => (
              <a
                aria-label={`Muhammad Sohail Motor House on ${social}`}
                className="grid size-9 place-items-center rounded-full border border-line text-[10px] font-semibold tracking-wide text-muted transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent-soft"
                href="https://instagram.com"
                key={social}
                rel="noreferrer"
                target="_blank"
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-muted">
            {[
              { label: 'Collection', to: '/inventory' },
              { label: 'Financing', to: '/financing' },
              { label: 'Our story', to: '/about' },
              { label: 'Contact', to: '/contact' },
            ].map((link) => (
              <Link
                className="group inline-flex w-fit items-center gap-2 transition hover:text-ink"
                key={link.to}
                to={link.to}
              >
                {link.label}
                <ArrowRight
                  className="opacity-0 transition duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                  size={13}
                />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">Visit the house</p>
          <div className="mt-5 space-y-4 text-sm leading-6 text-muted">
            <p className="flex gap-2.5">
              <MapPin className="mt-0.5 shrink-0 text-accent" size={15} />
              <span>1188 Shoreline Drive<br />Malibu, CA 90265</span>
            </p>
            <p className="flex gap-2.5">
              <Clock3 className="mt-0.5 shrink-0 text-accent" size={15} />
              Tue – Sat, 10am – 6pm
            </p>
            <a
              className="flex gap-2.5 transition hover:text-accent-soft"
              href="tel:+13105550184"
            >
              <Phone className="mt-0.5 shrink-0 text-accent" size={15} />
              +1 (310) 555-0184
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow">The insider list</p>
          <p className="mt-5 text-sm leading-6 text-muted">
            New arrivals, private previews, and the occasional very good road.
            No noise.
          </p>
          {subscribed ? (
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-3 text-xs text-accent-soft">
              <Check size={14} /> You are on the list.
            </p>
          ) : (
            <form
              className="mt-5 flex flex-col gap-2 sm:flex-row"
              onSubmit={handleSubscribe}
            >
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                autoComplete="email"
                className="form-field !rounded-full !py-3 text-xs"
                id="newsletter-email"
                placeholder="you@example.com"
                required
                type="email"
              />
              <ActionButton
                className="shrink-0"
                icon={<ArrowUpRight size={14} />}
                size="sm"
                type="submit"
              >
                Join
              </ActionButton>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-5 text-xs text-dim sm:px-8 md:flex-row md:items-center md:justify-between lg:px-14">
          <span>© 2026 Muhammad Sohail Motor House. Every drive has a story.</span>
          <span>Malibu, California · Est. 2013</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
