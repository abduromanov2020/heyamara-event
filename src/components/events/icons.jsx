// Single source of truth for the common line icons used across the app
// (no icon dependency). Canonical stroke weight is 1.6, currentColor,
// decorative unless labelled by the parent. A few glyphs (Check, X) keep a
// slightly heavier stroke so small tick/close marks stay readable.

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export function CalendarIcon({ className }) {
  return (
    <svg className={className} {...base}>
      <rect x="3.5" y="4.5" width="17" height="16" rx="2.5" />
      <path d="M3.5 9.5h17" />
      <path d="M8 3v3.2" />
      <path d="M16 3v3.2" />
    </svg>
  )
}

export function PinIcon({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
      <circle cx="12" cy="11" r="2.2" />
    </svg>
  )
}

export function GlobeIcon({ className }) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <ellipse cx="12" cy="12" rx="3.8" ry="8.5" />
    </svg>
  )
}

export function ClockIcon({ className }) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.6V12l3 1.8" />
    </svg>
  )
}

export function ArrowIcon({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  )
}

export function ChevronIcon({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function CheckIcon({ className }) {
  return (
    <svg className={className} {...base} strokeWidth={2}>
      <path d="M5 12l4 4 10-10" />
    </svg>
  )
}

export function XIcon({ className }) {
  return (
    <svg className={className} {...base} strokeWidth={2}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

export function FilterIcon({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="M3 5h18M6 12h12M10 19h4" />
    </svg>
  )
}

export function GridIcon({ className }) {
  return (
    <svg className={className} {...base}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </svg>
  )
}

export function ListIcon({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />
    </svg>
  )
}

// Location glyph picker shared by cards, rows and the banner.
export function LocationIcon({ locationType, className }) {
  return locationType === 'online' ? (
    <GlobeIcon className={className} />
  ) : (
    <PinIcon className={className} />
  )
}
