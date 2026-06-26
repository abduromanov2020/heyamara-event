import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { EASE } from '../lib/motion.js'

const MotionLink = motion.create(Link)

const LINKS = [
  { label: 'Experiences', href: '#experiences' },
  { label: 'Community', href: '#community' },
  { label: 'Mentorship', href: '#mentorship' },
  { label: 'AI Platform', href: '#ai-platform' },
]

export default function Nav({ onRequest }) {
  const reduce = useReducedMotion()

  // Stagger the primary links in after the bar settles.
  const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.18 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: -8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
  }

  return (
    <motion.nav
      aria-label="Primary"
      initial={reduce ? false : { y: -20, opacity: 0 }}
      animate={reduce ? false : { y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="sticky top-0 z-50"
    >
      <div className="relative backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-6 sm:px-10">
          {/* Left: real brand lockup, links back to all events */}
          <MotionLink
            to="/"
            aria-label="HeyAmara, view all events"
            whileHover={reduce ? undefined : { scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="inline-flex shrink-0 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60 focus-visible:ring-offset-4 focus-visible:ring-offset-ink-950"
          >
            <Logo />
          </MotionLink>

          {/* Center: primary links, hidden on mobile */}
          <motion.ul
            variants={reduce ? undefined : listVariants}
            initial={reduce ? false : 'hidden'}
            animate={reduce ? false : 'show'}
            className="hidden items-center gap-7 md:flex"
          >
            {LINKS.map((link) => (
              <motion.li key={link.label} variants={reduce ? undefined : itemVariants}>
                <a
                  href={link.href}
                  className="group relative inline-flex text-sm text-ink-300 outline-none transition-colors duration-200 hover:text-ink-200 focus-visible:text-ink-200"
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="brand-grad absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 rounded-full transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </motion.li>
            ))}
          </motion.ul>

          {/* Right: request CTA + member account */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {onRequest && (
              <motion.button
                type="button"
                onClick={onRequest}
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                className="btn-brand hidden shrink-0 items-center rounded-full px-4 py-2 text-sm font-semibold tracking-tight text-white outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 sm:inline-flex"
              >
                Request to Attend
              </motion.button>
            )}
            <motion.a
              href="#account"
              aria-label="Your member account"
              whileHover={reduce ? undefined : { scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="img-cover-fallback relative block h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-brand-300/45 outline-none transition-shadow duration-200 hover:ring-brand-300/70 focus-visible:ring-2 focus-visible:ring-brand-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
            >
              {/* On error the img hides, revealing the violet gradient fallback parent */}
              <img
                src="https://i.pravatar.cc/72?img=12"
                alt=""
                width="72"
                height="72"
                draggable="false"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
                className="h-full w-full object-cover"
              />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
