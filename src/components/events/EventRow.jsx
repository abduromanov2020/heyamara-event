import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { LocationIcon, ArrowIcon } from './icons.jsx'
import LazyImage from './LazyImage.jsx'
import { EASE } from '../../lib/motion.js'

const rowVariants = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

const reducedRowVariants = {
  hidden: { opacity: 1, y: 0 },
  shown: { opacity: 1, y: 0 },
}

// Ledger row: cover thumbnail | title + city | date · time | Register.
export default function EventRow({ event }) {
  const reduce = useReducedMotion()

  return (
    <motion.div layout variants={reduce ? reducedRowVariants : rowVariants}>
      <Link
        to={`/event/${event.slug}`}
        aria-label={`${event.title}. ${event.date} at ${event.time}, ${event.city}. Register.`}
        className="group relative grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-4 rounded-2xl px-2 py-3.5 outline-none transition-colors duration-300 hover:bg-brand-400/[0.06] focus-visible:ring-2 focus-visible:ring-brand-400/60 sm:grid-cols-[80px_minmax(0,1fr)_150px_140px] sm:gap-5 sm:px-3"
      >
        {/* Thumbnail */}
        <span className="img-fallback relative block aspect-square w-16 overflow-hidden rounded-xl ring-1 ring-brand-400/20 sm:w-20">
          <LazyImage
            src={event.image}
            alt=""
            containerClassName="h-full w-full"
            fade={false}
            className="h-full w-full object-cover transition-[transform,opacity] duration-500 ease-out group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </span>

        {/* Title + host */}
        <span className="min-w-0">
          <span className="block truncate font-sans text-base font-semibold tracking-tightest text-ink-200 transition-colors group-hover:text-brand-200 sm:text-lg">
            {event.title}
          </span>
          <span className="mt-1.5 flex items-center gap-1.5 text-[13px] text-ink-400">
            <img
              src={event.host.avatar}
              alt=""
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.visibility = 'hidden'
              }}
              className="h-5 w-5 shrink-0 rounded-full object-cover ring-1 ring-brand-400/25"
            />
            <span className="truncate">
              Hosted by <span className="text-ink-300">{event.host.name}</span>
            </span>
          </span>
        </span>

        {/* Date · time · location */}
        <span className="hidden flex-col items-end gap-0.5 text-right sm:flex">
          <span className="text-[13px] font-medium tabular-nums text-ink-200">
            {event.date}
          </span>
          <span className="text-[11.5px] tabular-nums text-ink-500">
            {event.time}
          </span>
          <span className="mt-0.5 flex items-center gap-1 text-[11.5px] text-ink-400">
            <LocationIcon
              locationType={event.locationType}
              className="h-3 w-3 shrink-0 text-brand-300/80"
            />
            <span className="truncate">{event.city}</span>
          </span>
        </span>

        {/* Register */}
        <span className="flex justify-end">
          <span className="chip inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold text-lilac transition-colors group-hover:text-brand-200">
            Register
            <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5" />
          </span>
        </span>
      </Link>
    </motion.div>
  )
}
