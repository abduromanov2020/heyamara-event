import { motion, useReducedMotion } from 'framer-motion'
import { useEvent } from '../context/EventContext.jsx'
import { EASE } from '../lib/motion.js'

// One short, evocative phrase in the second paragraph lifts to a brighter
// weight so the real promise of the night catches the eye, without turning
// confident prose into a highlighted list.
const EMPHASIS = 'behind closed doors'

function withEmphasis(text, phrase) {
  if (!phrase || !text.includes(phrase)) return text
  const [before, after] = text.split(phrase)
  return (
    <>
      {before}
      <span className="font-medium text-ink-200">{phrase}</span>
      {after}
    </>
  )
}

// Nested orchestration: the section staggers its two children (heading, then
// the prose group), and the prose group staggers each paragraph in turn. The
// container variants carry no transform of their own, only timing.
const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}
const groupVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
}

export default function About() {
  const event = useEvent()
  const reduceMotion = useReducedMotion()

  // No authored about copy for this event: render nothing.
  if (!event.about?.length) return null

  // When the user prefers reduced motion, drop every animation prop so the
  // content renders fully visible and static. No transforms, no opacity gates.
  const sectionMotion = reduceMotion
    ? {}
    : {
        variants: sectionVariants,
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, amount: 0.3 },
      }
  const groupMotion = reduceMotion ? {} : { variants: groupVariants }
  const itemMotion = reduceMotion ? {} : { variants: itemVariants }

  const paragraphs = event.about
  const lastIndex = paragraphs.length - 1

  return (
    <motion.section
      {...sectionMotion}
      aria-labelledby="about-heading"
      className="scroll-mt-28"
    >
      <motion.h2
        {...itemMotion}
        id="about-heading"
        className="font-sans text-2xl font-semibold tracking-tightest text-ink-200 sm:text-3xl"
      >
        About this table
      </motion.h2>

      <motion.div
        {...groupMotion}
        className="mt-6 max-w-[65ch] space-y-5 sm:space-y-6"
      >
        {paragraphs.map((para, i) => {
          const isClosing = i === lastIndex
          return (
            <motion.p
              {...itemMotion}
              key={i}
              className={`text-[15.5px] leading-relaxed ${
                isClosing ? 'text-ink-200' : 'text-ink-300'
              }`}
            >
              {i === 1 ? withEmphasis(para, EMPHASIS) : para}
            </motion.p>
          )
        })}
      </motion.div>
    </motion.section>
  )
}
