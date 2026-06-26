import { motion, useReducedMotion } from 'framer-motion'
import Logo from './Logo.jsx'
import { EASE } from '../lib/motion.js'

// Brand social channels. Inline brand glyphs (these are official wordmarks,
// not decorative hand-rolled icons), each square wears a violet hairline.
const socials = [
  {
    label: 'HeyAmara on X',
    href: 'https://x.com/heyamara',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z',
  },
  {
    label: 'HeyAmara on LinkedIn',
    href: 'https://www.linkedin.com/company/heyamara',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z',
  },
  {
    label: 'HeyAmara on Instagram',
    href: 'https://www.instagram.com/heyamara',
    path: 'M12 2.163c3.204 0 3.584.012 4.849.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
]

const groups = [
  { label: 'Experiences', links: ['Upcoming', 'Retreats', 'Dinners'] },
  { label: 'The Club', links: ['Apply', 'Community', 'Mentorship'] },
  { label: 'Company', links: ['Privacy', 'Terms', 'Careers'] },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

export default function Footer() {
  const reduce = useReducedMotion()

  // Gentle fade-up as the footer enters view; collapses to static when the
  // visitor prefers reduced motion.
  const groupMotion = reduce
    ? {}
    : {
        variants: container,
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, amount: 0.2 },
      }
  const childMotion = reduce ? {} : { variants: item }

  return (
    <footer className="relative">
      <div className="hairline-v" aria-hidden="true" />

      <div className="mx-auto max-w-[1400px] px-6 pt-14 pb-6 sm:px-10">
        <motion.div {...groupMotion}>
          <div className="grid gap-12 lg:grid-cols-[1.6fr_2fr]">
            {/* Brand column */}
            <motion.div {...childMotion}>
              <Logo />
              <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-ink-400">
                A private members club for the best recruiters in the world.
              </p>
              <div className="mt-6 flex items-center gap-4">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="text-ink-400 transition-colors duration-200 hover:text-ink-200 focus-visible:text-ink-200 focus-visible:outline-none"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Link columns */}
            <motion.div
              {...childMotion}
              className="grid grid-cols-2 gap-8 sm:grid-cols-3"
            >
              {groups.map((g) => {
                const headingId = `footer-${g.label.toLowerCase().replace(/\s+/g, '-')}`
                return (
                  <div key={g.label}>
                    <h3
                      id={headingId}
                      className="text-[11px] font-semibold uppercase tracking-[0.16em] text-lilac"
                    >
                      {g.label}
                    </h3>
                    <ul aria-labelledby={headingId} className="mt-4 space-y-3">
                      {g.links.map((link) => (
                        <li key={link}>
                          <a
                            href="#"
                            className="text-sm text-ink-400 transition-colors duration-200 hover:text-ink-200 focus-visible:text-ink-200 focus-visible:outline-none"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </motion.div>
          </div>

          {/* Bottom row */}
          <motion.div {...childMotion}>
            <div className="hairline-v mt-12" aria-hidden="true" />
            <div className="mt-6 flex flex-col gap-3 font-sans text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
              <p>&copy; 2026 HeyAmara. A product of HJ Vision FZ LLC.</p>
              <p>Made for the best recruiters in the world.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
