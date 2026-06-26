import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Reusable lazy image with a shimmering gray skeleton placeholder that fits the
// cosmic dark theme (ink-800 base with an ink-700 sheen sweeping across). The
// skeleton shows while the image decodes, then the image fades in on load.
// Pass `motionProps` to render a framer-motion <img> (e.g. to keep a hover
// zoom variant); otherwise a plain <img> is used. `onError` is forwarded so the
// existing gradient/hidden fallbacks keep working.
export default function LazyImage({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  motionProps,
  // When the consumer already drives a CSS transform transition on the image
  // (e.g. a hover zoom), pass fade={false} and include `opacity` in that
  // transition so the two don't fight over `transition-property`.
  fade = true,
  onError,
  children,
  ...imgProps
}) {
  const reduce = useReducedMotion()
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  const Img = motionProps ? motion.img : 'img'
  const fadeClass = fade && !reduce ? 'transition-opacity duration-700 ease-out' : ''

  return (
    <span className={`relative block overflow-hidden ${containerClassName}`}>
      {/* Gray shimmer skeleton — static under reduced motion (no sweep) */}
      {!loaded && !errored && (
        <span aria-hidden="true" className="absolute inset-0 bg-ink-800">
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-ink-700 to-transparent motion-safe:animate-shimmer" />
        </span>
      )}

      <Img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          setErrored(true)
          onError?.(e)
        }}
        className={`${className} ${fadeClass} ${loaded ? 'opacity-100' : 'opacity-0'}`}
        {...(motionProps || {})}
        {...imgProps}
      />

      {children}
    </span>
  )
}
