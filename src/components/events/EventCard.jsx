import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { CalendarIcon, ClockIcon, LocationIcon, ArrowIcon } from './icons.jsx'
import LazyImage from './LazyImage.jsx'
import { EASE } from '../../lib/motion.js'

const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  hover: { y: -8, transition: { type: 'spring', stiffness: 280, damping: 22 } },
}

const reducedCardVariants = {
  hidden: { opacity: 1, y: 0 },
  shown: { opacity: 1, y: 0 },
}

const imageVariants = {
  hover: { scale: 1.07, transition: { duration: 0.55, ease: EASE } },
}

// Cardless grid card matching MoreExperiences: the cover is the only framed
// element; meta, a 2-line clamped title and a "Hosted by" footer sit bare below.
export default function EventCard({ event }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      layout
      variants={reduce ? reducedCardVariants : cardVariants}
      whileHover={reduce ? undefined : 'hover'}
      className="min-w-0"
    >
      <Link
        to={`/event/${event.slug}`}
        aria-label={`${event.title}. ${event.date} at ${event.time}, ${event.city}. Hosted by ${event.host.name}. Register.`}
        className="group flex h-full flex-col rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60 focus-visible:ring-offset-4 focus-visible:ring-offset-ink-950"
      >
        {/* Cover (the only framed element) */}
        <div className="img-fallback relative aspect-[3/2] overflow-hidden rounded-2xl ring-1 ring-brand-400/15 transition-shadow duration-300 group-hover:shadow-[0_24px_60px_-28px_rgba(124,58,237,0.55)]">
          <LazyImage
            src={event.image}
            alt={event.alt}
            containerClassName="h-full w-full"
            className="h-full w-full object-cover will-change-transform"
            motionProps={{ variants: reduce ? undefined : imageVariants }}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
          {/* Location pill — strong dark backdrop so it stays legible on bright images */}
          <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink-950/70 px-2.5 py-1 text-[11px] font-medium text-ink-100 ring-1 ring-brand-400/30 backdrop-blur-sm">
            <LocationIcon
              locationType={event.locationType}
              className="h-3.5 w-3.5 shrink-0 text-lilac"
            />
            <span>{event.city}</span>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col pt-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[12px] text-ink-400">
            <span className="inline-flex items-center gap-1.5">
              <CalendarIcon className="h-3.5 w-3.5 shrink-0 text-brand-300/75" />
              {event.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon className="h-3.5 w-3.5 shrink-0 text-brand-300/75" />
              {event.time}
            </span>
          </div>

          {/* Title — clamp to 2 lines and reserve 2 lines so every card aligns */}
          <h3 className="mt-2.5 line-clamp-2 min-h-[2.8rem] font-sans text-[15px] font-medium leading-snug text-ink-200 transition-colors duration-200 group-hover:text-brand-200 sm:text-base">
            {event.title}
          </h3>

          {/* Hosted by footer + Register CTA */}
          <div className="mt-auto flex items-center gap-2 pt-5">
            <img
              src={event.host.avatar}
              alt=""
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.visibility = 'hidden'
              }}
              className="h-6 w-6 shrink-0 rounded-full object-cover ring-1 ring-brand-400/25"
            />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="text-[11px] text-ink-500">Hosted by</span>
              <span className="truncate text-[12.5px] text-ink-200">
                {event.host.name}
              </span>
            </span>
            <span className="chip ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold text-lilac transition-colors group-hover:text-brand-200">
              Register
              <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
