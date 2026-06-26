import { motion, useReducedMotion } from 'framer-motion'
import { useEvent } from '../context/EventContext.jsx'
import { CalendarIcon, PinIcon, ArrowIcon } from './events/icons.jsx'
import { EASE } from '../lib/motion.js'

/* Avatar: brand-grad span behind, initials as composed fallback, img hides on error. */
function Avatar({ name, src, className = '', textClass = 'text-xs' }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <span className={`relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full brand-grad ${className}`}>
      <span aria-hidden="true" className={`font-semibold text-ink-200/95 ${textClass}`}>
        {initials}
      </span>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </span>
  )
}

function InfoRow({ icon, primary, secondary }) {
  return (
    <div className="flex items-start gap-3">
      <span className="iconchip mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl">{icon}</span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink-200">{primary}</p>
        <p className="text-xs text-ink-400">{secondary}</p>
      </div>
    </div>
  )
}

export default function Sidebar({ onRequest }) {
  const event = useEvent()
  const reduce = useReducedMotion()

  // The "Who's at the table" block renders whenever attendees are authored.
  const hasTable = Boolean(event.attendees?.length)
  const attendees = event.attendees?.slice(0, 5) ?? []
  const remaining = Math.max(0, (event.claimed ?? 0) - attendees.length)
  const attendeeLabel = `Going: ${attendees.map((a) => a.name).join(', ')}${
    remaining > 0 ? `, and ${remaining} more` : ''
  }`

  const panelMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.7, ease: EASE },
      }

  const stackMotion = reduce
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, amount: 0.6 },
        variants: { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } } },
      }

  const avatarMotion = reduce
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, scale: 0.6 },
          show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 320, damping: 22 } },
        },
      }

  const buttonMotion = reduce
    ? {}
    : {
        variants: { rest: { y: 0 }, hover: { y: -2 } },
        initial: 'rest',
        animate: 'rest',
        whileHover: 'hover',
        whileTap: { scale: 0.985 },
        transition: { type: 'spring', stiffness: 320, damping: 24 },
      }

  const arrowMotion = reduce
    ? {}
    : {
        variants: { rest: { x: 0 }, hover: { x: 4 } },
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }

  return (
    <div className="relative">
      {/* Soft violet glow behind the rail (bleeds through the frosted glass). */}
      <div aria-hidden="true" className="pointer-events-none absolute -inset-4 -z-10">
        <div className="absolute left-1/2 top-6 h-52 w-52 -translate-x-1/2 rounded-full bg-brand-600/25 blur-[80px]" />
        <div className="absolute bottom-8 right-2 h-40 w-40 rounded-full bg-magenta/15 blur-[80px]" />
      </div>

      <motion.section {...panelMotion} aria-labelledby="reserve-heading" className="glass px-6 py-8">
        <h2 id="reserve-heading" className="font-sans text-2xl font-semibold leading-tight tracking-tight text-ink-200">
          Reserve Your Seat
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-400">
          {event.tagline}
        </p>

        <div className="mt-6 space-y-4">
          <InfoRow icon={<CalendarIcon className="h-4 w-4" />} primary={event.date} secondary={event.time} />
          <InfoRow
            icon={<PinIcon className="h-4 w-4" />}
            primary={
              [event.location.venue, event.location.area].filter(Boolean).join(', ') ||
              event.location.city
            }
            secondary={event.location.venue ? event.location.city : undefined}
          />
        </div>

        <div className="hairline-v my-6" aria-hidden="true" />

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-300/90">Hosted By</p>
          <ul className="mt-3 space-y-3">
            {event.hosts.map((host) => (
              <li key={host.name} className="flex items-center gap-3">
                <Avatar name={host.name} src={host.avatar} className="h-10 w-10" textClass="text-xs" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink-200">{host.name}</p>
                  {host.role && <p className="truncate text-xs text-ink-400">{host.role}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {hasTable && (
        <div className="mt-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-300/90">Who's At The Table</p>
          <div className="mt-3 flex items-center gap-3">
            <motion.div {...stackMotion} role="img" aria-label={attendeeLabel} className="flex items-center">
              {attendees.map((person) => (
                <motion.span key={person.name} {...avatarMotion} className="-ml-2 first:ml-0">
                  <Avatar name={person.name} src={person.avatar} className="h-9 w-9 ring-2 ring-ink-900" textClass="text-[10px]" />
                </motion.span>
              ))}
              {remaining > 0 && (
                <motion.span {...avatarMotion} className="-ml-2">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-600 text-[11px] font-semibold text-white ring-2 ring-ink-900">
                    +{remaining}
                  </span>
                </motion.span>
              )}
            </motion.div>
            <span className="text-sm font-medium text-ink-300">{event.claimed} going</span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-ink-400">{event.attendeesNote}</p>
        </div>
        )}

        <div className="hairline-v my-6" aria-hidden="true" />

        <motion.button
          type="button"
          onClick={() => onRequest?.()}
          {...buttonMotion}
          className="btn-brand flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
        >
          <span>Request to Attend</span>
          <motion.span {...arrowMotion} className="inline-flex">
            <ArrowIcon className="h-4 w-4" />
          </motion.span>
        </motion.button>
      </motion.section>
    </div>
  )
}
