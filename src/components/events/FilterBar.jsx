import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  ChevronIcon,
  CheckIcon,
  XIcon,
  FilterIcon,
  GridIcon,
  ListIcon,
} from './icons.jsx'
import { EASE } from '../../lib/motion.js'

/* ---- Desktop dropdown filter trigger ---- */
function Dropdown({ label, value, options, type, openMenu, setOpenMenu, onSelect }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const open = openMenu === type
  const active = Boolean(value)

  // Close this dropdown on any click outside it, or on Escape.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpenMenu(null)
    }
    const onKey = (e) => e.key === 'Escape' && setOpenMenu(null)
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, setOpenMenu])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpenMenu(open ? null : type)}
        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium tracking-tight outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-400/60 ${
          active
            ? 'brand-grad text-white'
            : 'chip text-ink-300 hover:text-ink-200'
        }`}
      >
        {value || label}
        <ChevronIcon
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          } ${active ? 'text-white/80' : 'text-ink-500'}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label={`Filter by ${label.toLowerCase()}`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: EASE }}
            className="hairline-card absolute left-0 top-[calc(100%+8px)] z-50 min-w-[200px] origin-top-left rounded-2xl p-1.5 shadow-[0_22px_48px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl"
          >
            {options.map((opt) => {
              const checked = value === opt
              return (
                <button
                  key={opt}
                  type="button"
                  role="menuitemradio"
                  aria-checked={checked}
                  onClick={() => {
                    onSelect(type, opt)
                    setOpenMenu(null)
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium outline-none transition-colors hover:bg-brand-400/10 focus-visible:bg-brand-400/10 ${
                    checked ? 'text-brand-100' : 'text-ink-300'
                  }`}
                >
                  {opt}
                  <CheckIcon
                    className={`h-3.5 w-3.5 text-brand-200 transition-opacity ${
                      checked ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ---- Applied filter chip (removable) ---- */
function AppliedChip({ type, value, onRemove }) {
  const reduce = useReducedMotion()
  return (
    <motion.button
      layout
      type="button"
      onClick={() => onRemove(type)}
      aria-label={`Remove ${value} filter`}
      initial={reduce ? false : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.2, ease: EASE }}
      className="frost inline-flex items-center gap-1.5 rounded-full py-1 pl-3 pr-1.5 text-xs font-semibold text-brand-100 outline-none transition-colors hover:text-ink-200 focus-visible:ring-2 focus-visible:ring-brand-400/60"
    >
      {value}
      <span className="grid h-4 w-4 place-items-center rounded-full bg-ink-950/40">
        <XIcon className="h-2.5 w-2.5" />
      </span>
    </motion.button>
  )
}

/* ---- View toggle (segmented) ---- */
function ViewToggle({ view, onView }) {
  const opts = [
    { key: 'grid', label: 'Grid', Icon: GridIcon },
    { key: 'list', label: 'List', Icon: ListIcon },
  ]
  return (
    <div
      role="group"
      aria-label="View"
      className="chip ml-auto inline-flex shrink-0 rounded-full p-1"
    >
      {opts.map(({ key, label, Icon }) => {
        const active = view === key
        return (
          <button
            key={key}
            type="button"
            aria-pressed={active}
            onClick={() => onView(key)}
            className={`relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold tracking-tight outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-400/60 ${
              active ? 'text-white' : 'text-ink-400 hover:text-ink-200'
            }`}
          >
            {active && (
              <motion.span
                layoutId="view-toggle-pill"
                className="brand-grad absolute inset-0 -z-10 rounded-full"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        )
      })}
    </div>
  )
}

/* ---- Mobile bottom sheet ---- */
function FilterSheet({ open, onClose, formats, cities, format, city, onSelect, onClear, resultCount }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const Group = ({ heading, type, options, selected }) => (
    <div>
      <p className="mb-2.5 text-xs font-semibold tracking-tight text-ink-500">
        {heading}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const checked = selected === opt
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={checked}
              onClick={() => onSelect(type, opt)}
              className={`rounded-full px-3.5 py-2 text-sm font-semibold tracking-tight outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-400/60 ${
                checked
                  ? 'brand-grad text-white'
                  : 'chip text-ink-300 hover:text-ink-200'
              }`}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-ink-950/70 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Filter events"
            className="glass fixed inset-x-0 bottom-0 z-[71] max-h-[82vh] overflow-y-auto rounded-t-3xl px-5 pb-8 pt-4 lg:hidden"
            initial={reduce ? { opacity: 0 } : { y: '100%' }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: '100%' }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-brand-400/35" />
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold tracking-tightest text-ink-200">
                Filters
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close filters"
                className="chip grid h-9 w-9 place-items-center rounded-full text-ink-400 outline-none transition-colors hover:text-ink-200 focus-visible:ring-2 focus-visible:ring-brand-400/60"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-5">
              <Group heading="Category" type="format" options={formats} selected={format} />
              <Group heading="City" type="city" options={cities} selected={city} />
            </div>

            <div className="hairline-v mt-6" />
            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                onClick={onClear}
                className="btn-ghost flex-1 rounded-full px-4 py-2.5 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={onClose}
                className="btn-cta flex-1 rounded-full px-4 py-2.5 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60"
              >
                Show {resultCount} {resultCount === 1 ? 'result' : 'results'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ---- Toolbar ---- */
export default function FilterBar({
  formats,
  cities,
  format,
  city,
  onSelect,
  onRemove,
  onClear,
  view,
  onView,
  resultCount,
  showViewToggle = true,
}) {
  const [openMenu, setOpenMenu] = useState(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const applied = []
  if (format) applied.push({ type: 'format', value: format })
  if (city) applied.push({ type: 'city', value: city })

  return (
    <div>
      {/* Top row: filter controls (left) · view toggle (right) */}
      <div className="flex items-center gap-3">
        {/* Mobile: single Filters button */}
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={sheetOpen}
          className="chip inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium tracking-tight text-ink-300 outline-none transition-colors hover:text-ink-200 focus-visible:ring-2 focus-visible:ring-brand-400/60 lg:hidden"
        >
          <FilterIcon className="h-4 w-4 text-brand-300" />
          Filters
          {applied.length > 0 && (
            <span className="brand-grad grid h-[18px] min-w-[18px] place-items-center rounded-full px-1 text-[11px] font-bold tabular-nums text-ink-950">
              {applied.length}
            </span>
          )}
        </button>

        {/* Desktop: dropdown triggers */}
        <div className="hidden items-center gap-2 lg:flex">
          <Dropdown
            label="Category"
            type="format"
            value={format}
            options={formats}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            onSelect={onSelect}
          />
          <Dropdown
            label="City"
            type="city"
            value={city}
            options={cities}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            onSelect={onSelect}
          />
        </div>

        {showViewToggle && <ViewToggle view={view} onView={onView} />}
      </div>

      {/* Applied filters row */}
      <AnimatePresence initial={false}>
        {applied.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold tracking-tight text-ink-500">
                Applied
              </span>
              <AnimatePresence initial={false}>
                {applied.map((f) => (
                  <AppliedChip
                    key={f.type}
                    type={f.type}
                    value={f.value}
                    onRemove={onRemove}
                  />
                ))}
              </AnimatePresence>
              <button
                type="button"
                onClick={onClear}
                className="ml-1 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-tight text-ink-400 underline-offset-2 outline-none transition-colors hover:text-brand-200 hover:underline focus-visible:ring-2 focus-visible:ring-brand-400/60"
              >
                Clear all
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <FilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        formats={formats}
        cities={cities}
        format={format}
        city={city}
        onSelect={onSelect}
        onClear={onClear}
        resultCount={resultCount}
      />
    </div>
  )
}
