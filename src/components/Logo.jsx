// The real HeyAmara brand lockup: the gradient "A" symbol + the wordmark in
// the brand serif. Use this everywhere the company logo / title appears.
export default function Logo({
  className = '',
  symbolClass = 'h-7 w-7',
  textClass = 'text-[19px]',
  showText = true,
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/heyamara-symbol.png"
        alt="HeyAmara"
        className={`${symbolClass} shrink-0 object-contain`}
        draggable="false"
      />
      {showText && (
        <span className={`font-display font-medium italic tracking-tightest text-ink-200 ${textClass}`}>
          HeyAmara
        </span>
      )}
    </span>
  )
}
