import { motion, useReducedMotion } from 'framer-motion'
import { useEvent } from '../context/EventContext.jsx'
import { EASE } from '../lib/motion.js'

/* Reveal + stagger choreography. Each is opt in at the call site so that a
   reduced motion preference collapses everything to a static, visible layout. */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
}
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

/* This project ships no icon library and the brief calls these glyphs out by
   name, so they are drawn here with one shared stroke and inherit currentColor. */
const glyphs = {
  pin: (
    <>
      <path d="M12 21s6.5-5 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 16 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.4" />
    </>
  ),
  people: (
    <>
      <path d="M15.5 19v-1.3a3.3 3.3 0 0 0-3.3-3.3H7.8a3.3 3.3 0 0 0-3.3 3.3V19" />
      <circle cx="10" cy="8" r="3.1" />
      <path d="M16.4 5.2a3.1 3.1 0 0 1 0 5.9" />
      <path d="M19.5 19v-1.3a3.3 3.3 0 0 0-2.5-3.2" />
    </>
  ),
  glass: (
    <>
      <path d="M6 4h12l-1.5 4.4a4.7 4.7 0 0 1-9 0L6 4Z" />
      <path d="M12 13v5" />
      <path d="M8.5 21h7" />
    </>
  ),
  book: (
    <>
      <path d="M6.5 4H17a1 1 0 0 1 1 1v12.5a1 1 0 0 1-1 1H6.5A1.5 1.5 0 0 1 5 17V5.5A1.5 1.5 0 0 1 6.5 4Z" />
      <path d="M5 17a1.5 1.5 0 0 1 1.5-1.5H18" />
    </>
  ),
  arrow: (
    <>
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </>
  ),
  utensils: (
    <>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 11v11" />
      <path d="M21 2v20" />
      <path d="M21 2a5 5 0 0 0-5 5v3a1 1 0 0 0 1 1h4" />
    </>
  ),
}

function Icon({ name, className = 'h-4 w-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {glyphs[name]}
    </svg>
  )
}

/* Street grid coordinates for the stylized cosmic map. */
const gridX = [34, 74, 116, 158, 206, 252, 300, 346, 388]
const gridY = [24, 58, 92, 126, 158]

export default function Details() {
  const event = useEvent()
  const reduce = useReducedMotion()

  // Optional rich data. The map card needs a venue, the directions link needs
  // a maps URL, and the format description only fits the authored flagship copy.
  const loc = event.location || {}
  const isOnline = event.locationType === 'online'
  const hasMap = Boolean(loc.venue)
  const included = event.included || []

  // Nothing concrete to show: render nothing.
  if (!event.format && !hasMap && included.length === 0) return null

  const reveal = reduce
    ? {}
    : {
        variants: container,
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, amount: 0.2 },
      }
  const appear = reduce ? {} : { variants: item }
  const stagger = reduce ? {} : { variants: container }
  const lift = reduce
    ? {}
    : { whileHover: { y: -4, transition: { type: 'spring', stiffness: 240, damping: 22 } } }

  return (
    <section id="details" aria-labelledby="details-heading" className="scroll-mt-24">
      <motion.div {...reveal}>
        <motion.h2
          id="details-heading"
          {...appear}
          className="font-sans text-2xl font-semibold tracking-tightest text-ink-200 sm:text-3xl"
        >
          The Details
        </motion.h2>

        {/* (1) Map card */}
        {hasMap && (
        <motion.div
          {...appear}
          {...lift}
          className="grad-card relative mt-6 overflow-hidden rounded-2xl bg-ink-900/50"
        >
          <div
            role="img"
            aria-label={
              isOnline
                ? `Online event, hosted ${[loc.venue, loc.city].filter(Boolean).join(', ')}`
                : `Stylized map showing ${loc.venue} in ${[loc.area, loc.city].filter(Boolean).join(', ')}`
            }
            className="img-fallback relative h-44 w-full overflow-hidden"
          >
            {isOnline ? (
              <>
                {/* Online treatment: a calm violet field with concentric rings
                    and a centred globe, in place of a map that would be empty. */}
                <svg
                  viewBox="0 0 400 176"
                  preserveAspectRatio="xMidYMid slice"
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  <defs>
                    <radialGradient id="amaraOnlineGlow" cx="50%" cy="50%" r="60%">
                      <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.32" />
                      <stop offset="60%" stopColor="#7C3AED" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <ellipse cx="200" cy="88" rx="190" ry="100" fill="url(#amaraOnlineGlow)" />
                  <g fill="none" stroke="#2A2340" strokeWidth="1.4">
                    <circle cx="200" cy="88" r="40" />
                    <circle cx="200" cy="88" r="70" />
                    <circle cx="200" cy="88" r="100" />
                  </g>
                </svg>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.span
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.45), transparent 70%)' }}
                    animate={reduce ? undefined : { scale: [0.85, 1.8], opacity: [0.6, 0] }}
                    transition={reduce ? undefined : { duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
                  />
                  <span
                    className="brand-grad relative grid h-12 w-12 place-items-center rounded-full text-white ring-2 ring-ink-950/70"
                    style={{ boxShadow: '0 0 22px 6px rgba(168,85,247,0.5)' }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="8.5" />
                      <path d="M3.5 12h17" />
                      <ellipse cx="12" cy="12" rx="3.8" ry="8.5" />
                    </svg>
                  </span>
                </div>
              </>
            ) : (
              <>
                <svg
                  viewBox="0 0 400 176"
                  preserveAspectRatio="xMidYMid slice"
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  <defs>
                    <radialGradient id="amaraMapGlow" cx="50%" cy="50%" r="60%">
                      <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.28" />
                      <stop offset="60%" stopColor="#7C3AED" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* faint violet wash gathering toward the pin */}
                  <ellipse cx="200" cy="88" rx="180" ry="96" fill="url(#amaraMapGlow)" />

                  {/* faint street grid */}
                  <g stroke="#2A2340" strokeWidth="1.4">
                    {gridX.map((x) => (
                      <line key={`vx-${x}`} x1={x} y1="0" x2={x} y2="176" />
                    ))}
                    {gridY.map((y) => (
                      <line key={`hy-${y}`} x1="0" y1={y} x2="400" y2={y} />
                    ))}
                  </g>

                  {/* two highlighted violet roads crossing at the centre */}
                  <path
                    d="M-8 52 C 70 58 150 80 200 88 C 250 96 332 96 408 118"
                    fill="none"
                    stroke="#7C3AED"
                    strokeOpacity="0.5"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M150 -8 C 172 30 192 62 200 88 C 210 118 226 150 238 184"
                    fill="none"
                    stroke="#7C3AED"
                    strokeOpacity="0.34"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  {/* lit core along the main avenue */}
                  <path
                    d="M-8 52 C 70 58 150 80 200 88 C 250 96 332 96 408 118"
                    fill="none"
                    stroke="#A855F7"
                    strokeOpacity="0.45"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>

                {/* glowing pin at the centre with a gentle pulse ring */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.span
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.45), transparent 70%)' }}
                    animate={reduce ? undefined : { scale: [0.8, 2.1], opacity: [0.6, 0] }}
                    transition={reduce ? undefined : { duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
                  />
                  <span
                    className="brand-grad relative block h-4 w-4 rounded-full ring-2 ring-ink-950/70"
                    style={{ boxShadow: '0 0 16px 5px rgba(168,85,247,0.55)' }}
                  />
                </div>
              </>
            )}
          </div>

          <div className="hairline-v" />

          {/* venue details + directions */}
          <div className="flex flex-wrap items-start justify-between gap-4 p-5">
            <div className="flex min-w-0 items-start gap-3">
              <span className="iconchip mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                <Icon name="pin" className="h-[18px] w-[18px]" />
              </span>
              <div className="min-w-0">
                <h3 className="font-sans text-lg text-ink-200">{loc.venue}</h3>
                <p className="mt-0.5 flex items-center text-sm text-ink-300">
                  {loc.area && (
                    <>
                      {loc.area}
                      <span className="dot-sep mx-2" aria-hidden="true" />
                    </>
                  )}
                  {loc.city}
                </p>
                {loc.note && (
                  <p className="mt-1.5 max-w-prose text-[13px] leading-relaxed text-ink-500">
                    {loc.note}
                  </p>
                )}
              </div>
            </div>

            {loc.maps && (
              <a
                href={loc.maps}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Directions to ${loc.venue}, opens in a new tab`}
                className="hairline-card group inline-flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium text-brand-200 transition-colors hover:text-ink-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
              >
                Directions
                <Icon
                  name="arrow"
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            )}
          </div>
        </motion.div>
        )}

        {/* (2) Capacity + What's Included */}
        <motion.div {...stagger} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Format */}
          {event.format && (
          <motion.div {...appear} {...lift} className="grad-card rounded-2xl bg-ink-900/50 p-5">
            <p className="text-xs font-semibold tracking-wide text-brand-300">Format</p>
            <div className="mt-3 flex items-center gap-2.5">
              <Icon name={isOnline ? 'people' : 'utensils'} className="h-4 w-4 text-brand-300" />
              <span className="font-sans text-sm text-ink-200">{event.format}</span>
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-400">
              {isOnline
                ? 'A live online session: cameras on, screens shared, nothing held back.'
                : 'An in person gathering for founders building at scale.'}
            </p>
          </motion.div>
          )}

          {/* What's Included */}
          {included.length > 0 && (
          <motion.div {...appear} {...lift} className="grad-card rounded-2xl bg-ink-900/50 p-5">
            <p className="text-xs font-semibold tracking-wide text-brand-300">What&apos;s Included</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2.5">
              {included.map((inc) => (
                <li key={inc.label} className="inline-flex items-center gap-2 text-sm text-ink-200">
                  <Icon name={inc.icon} className="h-4 w-4 text-brand-300" />
                  {inc.label}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-ink-400">Everything is on the house.</p>
          </motion.div>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}
