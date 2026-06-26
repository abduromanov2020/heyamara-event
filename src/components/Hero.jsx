import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useEvent } from '../context/EventContext.jsx'
import { CalendarIcon, ClockIcon, PinIcon, ArrowIcon } from './events/icons.jsx'
import { EASE } from '../lib/motion.js'

// Venue glyph is local: no shared equivalent. Same canonical 1.6 stroke as the
// shared line icons in events/icons.jsx.
const iconBase = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

function VenueIcon({ className = '' }) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M3 21h18" />
      <path d="M5.5 21V6.2a1 1 0 0 1 1-1H13a1 1 0 0 1 1 1V21" />
      <path d="M14 21V10.5h4a1 1 0 0 1 1 1V21" />
      <path d="M8 9h2.5M8 13h2.5M8 17h2.5" />
    </svg>
  )
}

export default function Hero({ onRequest }) {
  const event = useEvent()
  const reduce = useReducedMotion()

  // Stagger the eyebrow, title, description, meta and CTA in on load.
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
  }
  const rise = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE },
    },
  }

  const meta = [
    { Icon: CalendarIcon, label: event.date },
    { Icon: ClockIcon, label: event.time },
    { Icon: VenueIcon, label: event.location.venue },
  ].filter((m) => m.label)

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
    >
      {/* Faded cover behind the copy, with a gradient fallback if it fails */}
      <div aria-hidden className="img-cover-fallback absolute inset-0">
        <motion.img
          src={event.cover}
          alt={event.coverAlt}
          draggable="false"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
          initial={reduce ? { scale: 1 } : { scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: reduce ? 0 : 1.4, ease: EASE }}
          style={{ willChange: 'transform' }}
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/55 via-ink-950/80 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/35 to-transparent" />
      </div>

      {/* Signature violet glow, ambient hero light */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-24 right-[-6%] h-[34rem] w-[34rem] rounded-full opacity-60 blur-[120px] animate-orb-drift"
          style={{ background: 'radial-gradient(circle at 35% 35%, rgba(192,38,211,0.55), rgba(124,58,237,0.32) 45%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-40 left-[-10%] h-[28rem] w-[28rem] rounded-full opacity-45 blur-[130px]"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(124,58,237,0.5), transparent 70%)' }}
        />
      </div>

      {/* Bottom fade so the hero melts into the page background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-ink-950"
      />

      {/* Left aligned content in normal flow */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 pb-12 pt-14 sm:px-10 lg:pb-16 lg:pt-20">
        <motion.div
          variants={container}
          initial={reduce ? 'show' : 'hidden'}
          animate="show"
          className="max-w-3xl"
        >
          {/* Eyebrow: location */}
          <motion.div variants={rise}>
            <span className="chip inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11.5px] font-medium text-ink-300">
              <PinIcon className="h-3.5 w-3.5 text-brand-300" />
              {event.location.city}
            </span>
          </motion.div>

          {/* Title (set in sans, like the rest of the page copy) */}
          <motion.h1
            id="hero-heading"
            variants={rise}
            className="mt-6 font-sans text-[2.65rem] font-bold leading-[0.98] tracking-tightest text-ink-200 sm:text-6xl lg:text-7xl"
          >
            {event.name}
          </motion.h1>

          {/* Short description */}
          <motion.p
            variants={rise}
            className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-ink-300 sm:text-base"
          >
            {event.tagline}
          </motion.p>

          {/* Inline dot separated meta */}
          <motion.div
            variants={rise}
            className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13.5px] text-ink-200"
          >
            {meta.map(({ Icon, label }, i) => (
              <Fragment key={label}>
                {i > 0 && <span aria-hidden className="dot-sep" />}
                <span className="inline-flex items-center gap-1.5">
                  <Icon className="h-4 w-4 shrink-0 text-brand-300" />
                  <span>{label}</span>
                </span>
              </Fragment>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={rise} className="mt-8">
            <motion.button
              type="button"
              onClick={onRequest}
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.985 }}
              className="btn-brand group inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold tracking-tight text-white"
            >
              Request to Attend
              <ArrowIcon className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
