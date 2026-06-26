import { useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { events } from '../data/events.js'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import RsvpModal from '../components/RsvpModal.jsx'
import FilterBar from '../components/events/FilterBar.jsx'
import EventCard from '../components/events/EventCard.jsx'
import EventRow from '../components/events/EventRow.jsx'
import { CalendarIcon } from '../components/events/icons.jsx'
import { EASE } from '../lib/motion.js'

// Stable, data-driven filter options.
const FORMATS = [...new Set(events.map((e) => e.format))]
const CITIES = [...new Set(events.map((e) => e.city))]

const gridContainer = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
}
const listContainer = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } },
}

export default function EventsListPage() {
  const reduce = useReducedMotion()
  const [rsvpOpen, setRsvpOpen] = useState(false)
  const [view, setView] = useState('grid')
  const [format, setFormat] = useState(null)
  const [city, setCity] = useState(null)

  const select = (type, value) => {
    if (type === 'format') setFormat((cur) => (cur === value ? null : value))
    else setCity((cur) => (cur === value ? null : value))
  }
  const remove = (type) => (type === 'format' ? setFormat(null) : setCity(null))
  const clearAll = () => {
    setFormat(null)
    setCity(null)
  }

  // Banner disabled: the grid/list include ALL events (featured included),
  // run through the active filters.
  const filtered = useMemo(
    () =>
      events.filter(
        (e) => (!format || e.format === format) && (!city || e.city === city),
      ),
    [format, city],
  )

  const hasFilters = Boolean(format || city)
  const resultCount = filtered.length
  const isEmpty = resultCount === 0
  const noun = resultCount === 1 ? 'experience' : 'experiences'

  // Group filtered events by monthGroup for the list view (data order preserved).
  const months = useMemo(() => {
    const map = new Map()
    for (const e of filtered) {
      if (!map.has(e.monthGroup)) map.set(e.monthGroup, [])
      map.get(e.monthGroup).push(e)
    }
    return [...map.entries()]
  }, [filtered])

  return (
    <>
      <Nav onRequest={() => setRsvpOpen(true)} />

      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          {/* Page header */}
          <header className="pb-8 pt-12 sm:pt-16">
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={reduce ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-sans text-4xl font-semibold tracking-tightest text-ink-200 sm:text-5xl"
            >
              Upcoming Events
            </motion.h1>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={reduce ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
              className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-400"
            >
              Dinners, masterminds, workshops and retreats for the best recruiters
              in the world. Find what is coming up and save your seat.
            </motion.p>
          </header>

          {/* Toolbar */}
          <section aria-label="Filter and view events" className="mb-5">
            <FilterBar
              formats={FORMATS}
              cities={CITIES}
              format={format}
              city={city}
              onSelect={select}
              onRemove={remove}
              onClear={clearAll}
              view={view}
              onView={setView}
              resultCount={resultCount}
            />
          </section>

          {/* Result count line */}
          <div className="mb-8 px-1" aria-live="polite">
            <p className="text-[15px] leading-relaxed text-ink-400">
              <span className="font-semibold text-ink-200">
                {hasFilters ? 'We found ' : 'Showing all '}
              </span>
              <span className="inline-flex overflow-hidden align-baseline">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={resultCount}
                    initial={reduce ? false : { y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { y: 10, opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.24, ease: EASE }}
                    className="font-semibold tabular-nums text-brand-200"
                  >
                    {resultCount}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="font-semibold text-ink-200">
                {' '}
                {noun}
              </span>
            </p>
          </div>

          {/* Events */}
          <section aria-label="Events" className="pb-24">
            <AnimatePresence mode="wait">
              {isEmpty ? (
                <motion.div
                  key="empty"
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="hairline-card flex flex-col items-center justify-center rounded-3xl border-dashed px-6 py-20 text-center"
                >
                  <span className="chip mb-4 grid h-14 w-14 place-items-center rounded-full text-brand-300">
                    <CalendarIcon className="h-6 w-6" />
                  </span>
                  <h3 className="font-display text-lg font-semibold tracking-tightest text-ink-200">
                    No events match those filters
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
              ) : view === 'grid' ? (
                <motion.div
                  key="grid"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <motion.div
                    variants={gridContainer}
                    initial="hidden"
                    animate="shown"
                    className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  >
                    {filtered.map((e) => (
                      <EventCard key={e.slug} event={e} />
                    ))}
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  {months.map(([group, rows]) => (
                    <section key={group} className="mb-8">
                      <h2 className="px-2 pb-2 pt-4 font-sans text-xl font-semibold tracking-tightest text-ink-200 sm:px-3 sm:text-2xl">
                        {group}
                      </h2>
                      <div className="hairline-v mb-1" />
                      <motion.div
                        variants={listContainer}
                        initial="hidden"
                        animate="shown"
                        className="divide-y divide-brand-400/10"
                      >
                        {rows.map((e) => (
                          <EventRow key={e.slug} event={e} />
                        ))}
                      </motion.div>
                    </section>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </main>

      <Footer />

      <RsvpModal open={rsvpOpen} onClose={() => setRsvpOpen(false)} />
    </>
  )
}
