import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEvent } from '../context/EventContext.jsx'
import { getEventBySlug } from '../data/events.js'
import { CalendarIcon, PinIcon, ArrowIcon, XIcon, CheckIcon } from './events/icons.jsx'
import { EASE } from '../lib/motion.js'

// The modal can open from surfaces with no EventProvider (e.g. the events list
// page's nav CTA). Fall back to the flagship event so it always has real data.
const FALLBACK_EVENT = getEventBySlug('the-founders-table')

/* ------------------------------------------------------------------ */
/* One-off glyph: the sparkle emblem is unique to this modal.         */
/* ------------------------------------------------------------------ */

function SparkleIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.4c.3 3.6 1.6 5.9 3.9 7 .9.4.9 1.7 0 2.1-2.3 1.1-3.6 3.4-3.9 7-.3-3.6-1.6-5.9-3.9-7-.9-.4-.9-1.7 0-2.1 2.3-1.1 3.6-3.4 3.9-7Z" />
      <path d="M19 3c.13 1.5.67 2.46 1.62 2.92.38.18.38.72 0 .9C19.67 7.28 19.13 8.24 19 9.75c-.13-1.51-.67-2.47-1.62-2.93-.38-.18-.38-.72 0-.9C18.33 5.46 18.87 4.5 19 3Z" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Confetti burst (skipped entirely under reduced motion)             */
/* Pieces emanate from the seat being held, arc out, and fade.        */
/* ------------------------------------------------------------------ */

function Confetti({ pieces }) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 z-20" aria-hidden="true">
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className="absolute left-0 top-0 block"
          style={{
            width: p.w,
            height: p.h,
            backgroundColor: p.color,
            borderRadius: p.round ? '9999px' : '1.5px',
          }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.4, rotate: 0 }}
          animate={{
            x: [0, p.dx * 0.55, p.dx],
            y: [0, -p.rise, p.dy],
            opacity: [1, 1, 0],
            scale: [0.5, 1, 0.85],
            rotate: [0, p.rot * 0.5, p.rot],
          }}
          transition={{ duration: p.dur, delay: p.delay, ease: 'easeOut', times: [0, 0.45, 1] }}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* RsvpModal                                                          */
/* ------------------------------------------------------------------ */

export default function RsvpModal({ open, onClose }) {
  const event = useEvent() ?? FALLBACK_EVENT
  const reduce = useReducedMotion()
  const closeRef = useRef(null)
  const panelRef = useRef(null)
  const onCloseRef = useRef(onClose)
  const titleId = useId()
  const descId = useId()

  // Two-step flow: 'form' collects name + email, 'done' celebrates the held seat.
  const [step, setStep] = useState('form')
  const [form, setForm] = useState({ name: '', email: '' })
  const [errors, setErrors] = useState({})
  const nameId = useId()
  const emailId = useId()

  // Whether the user's seat has popped into place (drives the fill + confetti).
  const [held, setHeld] = useState(false)

  const setField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e))
  }

  // Keep latest onClose without re-running the open effect on every render.
  useEffect(() => {
    onCloseRef.current = onClose
  })
  const close = useCallback(() => onCloseRef.current?.(), [])

  // Open side effects: lock scroll, focus the close button, Escape + focus trap.
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const raf = requestAnimationFrame(() => closeRef.current?.focus())

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key === 'Tab' && panelRef.current) {
        const nodes = panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )
        if (nodes.length === 0) return
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  // Reset back to the request form every time the modal opens.
  useEffect(() => {
    if (open) {
      setStep('form')
      setHeld(false)
      setForm({ name: '', email: '' })
      setErrors({})
    }
  }, [open])

  // Validate name + email, then advance to the confirmation step.
  const handleSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = 'Enter a valid email address.'
    setErrors(next)
    if (Object.keys(next).length === 0) setStep('done')
  }

  // Hold the seat shortly after the confirmation appears so the fill reads as a real moment.
  useEffect(() => {
    if (!open || step !== 'done') return
    if (reduce) {
      setHeld(true)
      return
    }
    const t = setTimeout(() => setHeld(true), 720)
    return () => clearTimeout(t)
  }, [open, step, reduce])

  // Confetti pieces, generated once. Empty under reduced motion.
  const pieces = useMemo(() => {
    if (reduce) return []
    const colors = ['#A855F7', '#D946EF', '#F0ABFC', '#C4B5FD']
    return Array.from({ length: 20 }, (_, i) => {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.2
      const dist = 44 + Math.random() * 58
      return {
        dx: Math.cos(angle) * dist,
        rise: 32 + Math.random() * 50,
        dy: 28 + Math.random() * 52,
        rot: (Math.random() * 2 - 1) * 240,
        color: colors[i % colors.length],
        w: 4 + Math.round(Math.random() * 3),
        h: 7 + Math.round(Math.random() * 6),
        round: Math.random() > 0.62,
        delay: Math.random() * 0.09,
        dur: 1 + Math.random() * 0.55,
      }
    })
  }, [reduce])

  // Downloadable calendar file. Sydney in July is AEST (UTC+10), no DST.
  const calHref = useMemo(() => {
    const esc = (s) => String(s).replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n')
    const loc = `${event.location.venue}, ${event.location.area}, ${event.location.city}`
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//HeyAmara//The Founders Table//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:founders-table-20260716@heyamara.co',
      'DTSTAMP:20260626T000000Z',
      'DTSTART:20260716T083000Z',
      'DTEND:20260716T120000Z',
      `SUMMARY:${esc(event.name)}`,
      `LOCATION:${esc(loc)}`,
      `DESCRIPTION:${esc(event.tagline)}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ]
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join('\r\n'))}`
  }, [event])

  const claimed = event.claimed
  const capacity = event.capacity
  const heldIndex = claimed
  const filled = held ? claimed + 1 : claimed

  const backdropT = reduce ? { duration: 0 } : { duration: 0.3, ease: EASE }
  const panelMotion = reduce
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 20, scale: 0.94 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 12, scale: 0.96 },
        transition: { type: 'spring', stiffness: 260, damping: 26, mass: 0.9 },
      }

  // Light wrapper reveal for inner content.
  const reveal = (delay) =>
    reduce
      ? { initial: false }
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: EASE },
        }

  return (
    <AnimatePresence onExitComplete={() => setHeld(false)}>
      {open && (
        <motion.div
          key="rsvp-backdrop"
          className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-ink-950/70 px-4 py-6 backdrop-blur-md sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={backdropT}
          onClick={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="glass relative w-full max-w-md rounded-3xl p-7"
            {...panelMotion}
          >
            {/* Soft brand glow at the top, purely decorative */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-40 rounded-t-3xl opacity-70"
              style={{
                background:
                  'radial-gradient(120% 80% at 50% 0%, rgba(217,70,239,.20), transparent 70%)',
              }}
            />

            {/* Close */}
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="btn-ghost absolute right-4 top-4 z-20 grid h-9 w-9 cursor-pointer place-items-center rounded-full transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-850"
            >
              <XIcon className="h-4 w-4" />
            </button>

            <div className="relative">
              {step === 'form' && (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Request emblem */}
                  <motion.div
                    className="relative mx-auto grid h-14 w-14 place-items-center rounded-full brand-grad text-white"
                    style={{
                      boxShadow:
                        'inset 0 1px 0 rgba(244,241,251,.4), 0 12px 34px -8px rgba(217,70,239,.7)',
                    }}
                    initial={reduce ? false : { opacity: 0, scale: 0.5, y: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 16 }}
                  >
                    <SparkleIcon className="h-6 w-6" />
                  </motion.div>

                  <motion.h2
                    id={titleId}
                    className="mt-5 text-center font-sans text-[1.75rem] font-semibold leading-tight tracking-tightest text-ink-200"
                    {...reveal(0.08)}
                  >
                    Request to attend
                  </motion.h2>
                  <motion.p
                    id={descId}
                    className="mx-auto mt-2.5 max-w-[21rem] text-center text-[0.95rem] leading-relaxed text-ink-400"
                    {...reveal(0.14)}
                  >
                    Twelve seats, by request only. Tell us who is joining and Harvey will be in touch within 24 hours.
                  </motion.p>

                  <motion.div className="mt-6 space-y-4" {...reveal(0.2)}>
                    <div>
                      <label htmlFor={nameId} className="mb-1.5 block text-[13px] font-medium text-ink-300">
                        Full name
                      </label>
                      <input
                        id={nameId}
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => setField('name', e.target.value)}
                        aria-invalid={errors.name ? 'true' : undefined}
                        placeholder="Jordan Avery"
                        className="frost w-full rounded-xl px-3.5 py-2.5 text-[15px] text-ink-200 outline-none ring-1 ring-inset ring-brand-400/15 transition placeholder:text-ink-500 focus:ring-2 focus:ring-brand-400/55"
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-[12px] text-rose">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor={emailId} className="mb-1.5 block text-[13px] font-medium text-ink-300">
                        Email
                      </label>
                      <input
                        id={emailId}
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setField('email', e.target.value)}
                        aria-invalid={errors.email ? 'true' : undefined}
                        placeholder="you@agency.com"
                        className="frost w-full rounded-xl px-3.5 py-2.5 text-[15px] text-ink-200 outline-none ring-1 ring-inset ring-brand-400/15 transition placeholder:text-ink-500 focus:ring-2 focus:ring-brand-400/55"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-[12px] text-rose">{errors.email}</p>
                      )}
                    </div>
                  </motion.div>

                  <motion.div className="mt-6" {...reveal(0.26)}>
                    <button
                      type="submit"
                      className="btn-brand inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-[15px] font-semibold transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-850"
                    >
                      Request your seat
                      <ArrowIcon className="h-4 w-4" />
                    </button>
                    <p className="mt-3 text-center text-[12px] text-ink-500">
                      We only use this to confirm your seat. No spam, ever.
                    </p>
                  </motion.div>
                </form>
              )}

              {step === 'done' && (
              <>
              {/* Celebratory emblem */}
              <motion.div
                className="relative mx-auto grid h-14 w-14 place-items-center rounded-full brand-grad text-white"
                style={{
                  boxShadow:
                    'inset 0 1px 0 rgba(244,241,251,.4), 0 12px 34px -8px rgba(217,70,239,.7)',
                }}
                initial={reduce ? false : { opacity: 0, scale: 0.4, rotate: -12 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 15, delay: 0.05 }}
              >
                {!reduce && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full brand-grad"
                    animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.5, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ filter: 'blur(7px)', zIndex: -1 }}
                  />
                )}
                <SparkleIcon className="h-6 w-6" />
              </motion.div>

              {/* Headline + reassurance */}
              <motion.h2
                id={titleId}
                className="mt-5 text-center font-sans text-[1.75rem] font-semibold leading-tight tracking-tightest text-ink-200"
                {...reveal(0.12)}
              >
                {form.name.trim()
                  ? `You're on the list, ${form.name.trim().split(/\s+/)[0]}`
                  : "You're on the list"}
              </motion.h2>
              <motion.p
                id={descId}
                className="mx-auto mt-2.5 max-w-[20rem] text-center text-[0.95rem] leading-relaxed text-ink-400"
                {...reveal(0.18)}
              >
                Harvey reads every request himself. You will hear back within 24 hours.
              </motion.p>

              {/* The table: 12 seats. Nine claimed, your seat springs in to make ten. */}
              <motion.div className="mt-6" {...reveal(0.24)}>
                <div className="mb-3 flex items-center justify-between text-[13px]">
                  <span className="text-ink-400">Your seat at the table</span>
                  <span className="text-ink-400">
                    <span className="inline-flex min-w-[1.5em] justify-end overflow-hidden align-baseline">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={filled}
                          className="font-semibold tabular-nums text-brand-200"
                          initial={reduce ? false : { y: -8, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={reduce ? { opacity: 0 } : { y: 8, opacity: 0 }}
                          transition={{ duration: reduce ? 0 : 0.24 }}
                        >
                          {filled}
                        </motion.span>
                      </AnimatePresence>
                    </span>{' '}
                    of {capacity} held
                  </span>
                </div>

                <div className="grid grid-cols-6 gap-2.5">
                  {Array.from({ length: capacity }, (_, i) => {
                    const entrance = reduce
                      ? { initial: false }
                      : {
                          initial: { opacity: 0, scale: 0.3 },
                          animate: { opacity: 1, scale: 1 },
                          transition: { type: 'spring', stiffness: 360, damping: 22, delay: 0.28 + i * 0.04 },
                        }

                    if (i === heldIndex) {
                      // The held seat: empty, then springs into a glowing brand dot.
                      return (
                        <div key={i} className="relative aspect-square">
                          <motion.div
                            className="absolute inset-0 rounded-full frost ring-1 ring-inset ring-brand-400/25"
                            {...entrance}
                          />
                          {!held && !reduce && (
                            <motion.div
                              aria-hidden="true"
                              className="absolute inset-0 rounded-full"
                              style={{ boxShadow: '0 0 0 1px rgba(217,70,239,.55)' }}
                              animate={{ opacity: [0.35, 0.85, 0.35], scale: [1, 1.16, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            />
                          )}
                          <motion.div
                            aria-hidden="true"
                            className="absolute inset-0 rounded-full brand-grad"
                            initial={false}
                            animate={held ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 16, delay: 0.02 }}
                            style={{
                              boxShadow:
                                '0 0 0 4px rgba(168,85,247,.18), 0 8px 26px -3px rgba(217,70,239,.8)',
                            }}
                          />
                          <motion.div
                            aria-hidden="true"
                            className="absolute inset-0 grid place-items-center text-white"
                            initial={false}
                            animate={{ opacity: held ? 1 : 0, scale: held ? 1 : 0.4 }}
                            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 18, delay: 0.08 }}
                          >
                            <CheckIcon className="h-3.5 w-3.5" />
                          </motion.div>
                          {held && !reduce && <Confetti pieces={pieces} />}
                        </div>
                      )
                    }

                    const isClaimed = i < heldIndex
                    return (
                      <motion.div key={i} className="relative aspect-square" {...entrance}>
                        {isClaimed ? (
                          <div
                            className="absolute inset-0 rounded-full brand-grad opacity-90"
                            style={{
                              boxShadow:
                                'inset 0 1px 0 rgba(196,166,251,.28), 0 2px 8px -3px rgba(124,58,237,.6)',
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 rounded-full frost opacity-50 ring-1 ring-inset ring-brand-400/15" />
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Seat held chip */}
              <div className="mt-5 flex justify-center">
                <motion.div
                  className="chip inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium text-brand-200"
                  initial={false}
                  animate={held ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 6, scale: 0.92 }}
                  transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <span className="grid h-4 w-4 place-items-center rounded-full brand-grad text-white">
                    <CheckIcon className="h-2.5 w-2.5" />
                  </span>
                  Seat held
                </motion.div>
              </div>

              {/* Concrete details, grounding the calendar action */}
              <motion.div className="mt-5 grid gap-2.5 frost rounded-2xl p-3.5 text-sm" {...reveal(0.32)}>
                <div className="flex items-center gap-2.5 text-ink-300">
                  <span className="iconchip grid h-7 w-7 shrink-0 place-items-center rounded-lg">
                    <CalendarIcon className="h-4 w-4" />
                  </span>
                  <span>
                    {event.date}
                    <span className="text-ink-500"> · </span>
                    {event.time}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-ink-300">
                  <span className="iconchip grid h-7 w-7 shrink-0 place-items-center rounded-lg">
                    <PinIcon className="h-4 w-4" />
                  </span>
                  <span>
                    {event.location.venue}
                    <span className="text-ink-500"> · </span>
                    {event.location.area}
                  </span>
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2" {...reveal(0.38)}>
                <button
                  type="button"
                  onClick={close}
                  className="btn-cta inline-flex items-center justify-center rounded-full px-5 py-3 text-[15px] font-semibold transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-850"
                >
                  Done
                </button>
                <a
                  href={calHref}
                  download="founders-table.ics"
                  className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[15px] font-medium transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-850"
                >
                  <CalendarIcon className="h-4 w-4" />
                  Add to calendar
                </a>
              </motion.div>
              </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
