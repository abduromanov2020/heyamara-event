import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../lib/motion.js'

// "How the Night Runs" is intentionally the same on every event, so the run of
// show is a fixed list here rather than per-event data.
const STEPS = [
  { time: '6:30 PM', title: 'Arrival and champagne', blurb: 'Walk in, drop the pitch, and pick up a glass. A soft landing before the real conversation begins.', icon: 'glass' },
  { time: '7:00 PM', title: 'Dinner and the roundtable', blurb: 'What is actually working in 2026. Every seat speaks, and the real numbers land on the table instead of in a deck.', icon: 'plate' },
  { time: '8:30 PM', title: 'Fireside on the bottleneck', blurb: 'A candid talk on scaling past the founder bottleneck without burning the culture or the margin.', icon: 'mic' },
  { time: '9:30 PM', title: 'Open networking', blurb: 'The introductions you came for. Stay as long as the conversation stays good.', icon: 'people' },
]

// Inline timeline glyphs, chosen by item.icon. Stroke inherits the violet
// .iconchip color via currentColor. Decorative only (titles carry meaning).
function Glyph({ name }) {
  const props = {
    className: 'h-[18px] w-[18px]',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  switch (name) {
    case 'plate': // fork and knife
      return (
        <svg {...props}>
          <path d="M7 3v4M8.6 3v4M10.2 3v4" />
          <path d="M7 7h3.2" />
          <path d="M8.6 7v14" />
          <path d="M16 3v18" />
          <path d="M16 3c2 0 2 9 0 9" />
        </svg>
      )
    case 'mic': // microphone
      return (
        <svg {...props}>
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M6 11a6 6 0 0 0 12 0" />
          <path d="M12 17v3" />
          <path d="M9 20h6" />
        </svg>
      )
    case 'people': // a small group
      return (
        <svg {...props}>
          <circle cx="9" cy="7.5" r="2.3" />
          <path d="M4.7 19v-.4a4.3 4.3 0 0 1 8.6 0V19" />
          <circle cx="16.2" cy="6.6" r="1.9" />
          <path d="M15 12.4a4.2 4.2 0 0 1 4.3 4.4V19" />
        </svg>
      )
    case 'glass': // champagne or wine glass
    default:
      return (
        <svg {...props}>
          <path d="M8 3h8" />
          <path d="M8 3c0 5 1.6 8 4 8s4-3 4-8" />
          <path d="M12 11v7" />
          <path d="M9 18h6" />
        </svg>
      )
  }
}

export default function Agenda() {
  const reduce = useReducedMotion()
  const steps = STEPS

  const list = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  }
  const row = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  }
  const node = {
    hidden: { scale: 0.4, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 360, damping: 18, delay: 0.06 },
    },
  }

  return (
    <section id="agenda" aria-labelledby="agenda-heading" className="scroll-mt-24">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <h2
          id="agenda-heading"
          className="font-sans text-2xl font-semibold tracking-tightest text-ink-200 sm:text-3xl"
        >
          How the Night Runs
        </h2>
        <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-ink-400 sm:text-[15px]">
          A loose shape for the evening, built around one long table and the kind of
          conversation that does not watch the clock.
        </p>
      </motion.div>

      <motion.ol
        variants={reduce ? undefined : list}
        initial={reduce ? false : 'hidden'}
        whileInView={reduce ? undefined : 'show'}
        viewport={{ once: true, amount: 0.2 }}
        className="mt-9 sm:mt-10"
      >
        {steps.map((item, i) => {
          const isLast = i === steps.length - 1
          const [bigTime, unit] = item.time.split(' ')

          return (
            <motion.li
              key={item.title}
              variants={reduce ? undefined : row}
              className="grid grid-cols-[54px_1fr] gap-7"
            >
              {/* Time: big value over small unit, in Inter */}
              <div className="flex h-8 flex-col items-end justify-center text-right">
                <span className="font-sans text-[15px] font-semibold leading-none text-ink-200 tabular-nums">
                  {bigTime}
                </span>
                {unit && (
                  <span className="mt-1 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">
                    {unit}
                  </span>
                )}
              </div>

              {/* Rail, node, and copy */}
              <div className={`relative pl-12 ${isLast ? 'pb-0' : 'pb-10 sm:pb-12'}`}>
                {!isLast && (
                  <span
                    aria-hidden
                    className="rail absolute bottom-0 left-[15px] top-8 w-[2px] rounded-full"
                  />
                )}

                <motion.span
                  aria-hidden
                  variants={reduce ? undefined : node}
                  className="iconchip absolute left-0 top-0 z-10 grid h-8 w-8 place-items-center rounded-full ring-1 ring-brand-400/25"
                >
                  <Glyph name={item.icon} />
                </motion.span>

                <h3 className="font-sans text-[17px] font-bold leading-snug text-ink-200">
                  {item.title}
                </h3>
                <p className="mt-1.5 max-w-[46ch] text-sm leading-relaxed text-ink-400">
                  {item.blurb}
                </p>
              </div>
            </motion.li>
          )
        })}
      </motion.ol>
    </section>
  )
}
