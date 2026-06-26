import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import EventCard from './events/EventCard.jsx'
import FilterBar from './events/FilterBar.jsx'
import { events } from '../data/events.js'
import { ArrowIcon, CalendarIcon } from './events/icons.jsx'
import { EASE } from '../lib/motion.js'

/*
 * MoreExperiences
 * The detail-page "More experiences" section. It reuses the exact grid card
 * from the events list page (EventCard) so the two surfaces stay visually
 * identical, and the same FilterBar (with the Grid/List view toggle hidden,
 * since this section is grid-only) so the filter look + behaviour mirror the
 * list page / HTML prototype. This component owns the section header, the
 * filter state and the stagger container; each card owns its own reveal/hover
 * motion and reduced-motion handling, so the variants compose cleanly.
 */

// With no filters, cap at four for a tidy single row in the 4-column grid.
const DEFAULT_CAP = 4

const gridVariants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
}

export default function MoreExperiences() {
  const reduce = useReducedMotion()
  const { slug } = useParams()
  const [format, setFormat] = useState(null)
  const [city, setCity] = useState(null)

  // Curate the other events, excluding whichever event is currently in view.
  const pool = useMemo(() => events.filter((e) => e.slug !== slug), [slug])

  // Data-driven filter options scoped to this section's pool.
  const formats = useMemo(() => [...new Set(pool.map((e) => e.format))], [pool])
  const cities = useMemo(() => [...new Set(pool.map((e) => e.city))], [pool])

  const select = (type, value) => {
    if (type === 'format') setFormat((cur) => (cur === value ? null : value))
    else setCity((cur) => (cur === value ? null : value))
  }
  const remove = (type) => (type === 'format' ? setFormat(null) : setCity(null))
  const clearAll = () => {
    setFormat(null)
    setCity(null)
  }

  const hasFilters = Boolean(format || city)

  // Same matching logic as the list page. Drop the 4-cap once filters are
  // active so every match in this section stays visible.
  const filtered = useMemo(() => {
    const matches = pool.filter(
      (e) => (!format || e.format === format) && (!city || e.city === city),
    )
    return hasFilters ? matches : matches.slice(0, DEFAULT_CAP)
  }, [pool, format, city, hasFilters])

  const resultCount = filtered.length
  const isEmpty = resultCount === 0

  return (
    <section
      id="more-experiences"
      aria-labelledby="more-experiences-heading"
      className="w-full"
    >
      <div className="mx-auto max-w-[1400px] px-6 pb-20 pt-10 sm:px-10 sm:pt-10">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="max-w-xl">
            <h2
              id="more-experiences-heading"
              className="font-sans text-2xl font-semibold tracking-tightest text-ink-200 sm:text-3xl"
            >
              More experiences
            </h2>
            <p className="mt-2 text-sm text-ink-400 sm:text-[15px]">
              Curated for you this quarter.
            </p>
          </div>

          <a
            href="#all-experiences"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full text-sm font-medium text-lilac transition-colors hover:text-brand-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
          >
            View all
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="hairline-v mt-6" />

        {/* Filter — same controls as the list page, grid-only (no view toggle) */}
        <section aria-label="Filter experiences" className="mt-6">
          <FilterBar
            formats={formats}
            cities={cities}
            format={format}
            city={city}
            onSelect={select}
            onRemove={remove}
            onClear={clearAll}
            resultCount={resultCount}
            showViewToggle={false}
          />
        </section>

        {/* Grid of list-page cards (EventCard owns each card's own motion) */}
        <AnimatePresence mode="wait">
          {isEmpty ? (
            <motion.div
              key="empty"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="hairline-card mt-10 flex flex-col items-center justify-center rounded-3xl border-dashed px-6 py-20 text-center"
            >
              <span className="chip mb-4 grid h-14 w-14 place-items-center rounded-full text-brand-300">
                <CalendarIcon className="h-6 w-6" />
              </span>
              <h3 className="font-display text-lg font-semibold tracking-tightest text-ink-200">
                No experiences match those filters
              </h3>
              <p className="mt-2 max-w-sm text-sm text-ink-400">
                Try a different format or city, or clear your filters to see
                everything coming up.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="btn-cta mt-5 rounded-full px-4 py-2 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="mt-10 grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              variants={gridVariants}
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, amount: 0.2 }}
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((event) => (
                  <EventCard key={event.slug} event={event} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
