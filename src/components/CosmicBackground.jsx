import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

// A simple cosmic backdrop: a twinkling starfield on a near black base.
// A single requestAnimationFrame loop drives the twinkle and a subtle cursor
// parallax, where nearer stars drift a little more than far ones. Under
// reduced motion we paint one static frame and bind no pointer or rAF loop.

const STAR_TINTS = ['#F4F1FB', '#C4B5FD', '#F0ABFC', '#A855F7']

export default function CosmicBackground() {
  const reduceMotion = useReducedMotion()
  const canvasRef = useRef(null)
  // Live parallax state kept out of React so mousemove never re renders.
  const pointer = useRef({ tx: 0, ty: 0, x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = 0
    let height = 0
    let stars = []
    let raf = 0
    let resizeTimer = 0

    const seedStars = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.max(80, Math.min(220, Math.floor((width * height) / 7200)))
      stars = []
      for (let i = 0; i < count; i++) {
        // depth 0..1 -> nearer stars are larger, brighter, and parallax more.
        const depth = Math.random()
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.4 + depth * 1.4,
          base: 0.18 + Math.random() * 0.5,
          tw: 0.0008 + Math.random() * 0.0016,
          phase: Math.random() * Math.PI * 2,
          depth,
          tint: STAR_TINTS[(Math.random() * STAR_TINTS.length) | 0],
        })
      }
    }

    const paint = (time, px, py) => {
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        const alpha = reduceMotion
          ? s.base
          : s.base + Math.sin(time * s.tw + s.phase) * 0.32
        const ox = px * (4 + s.depth * 18)
        const oy = py * (4 + s.depth * 18)
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha))
        ctx.fillStyle = s.tint
        ctx.beginPath()
        ctx.arc(s.x + ox, s.y + oy, s.r, 0, 6.2832)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    seedStars()

    if (reduceMotion) {
      paint(0, 0, 0)
      const onResizeStatic = () => {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(() => {
          seedStars()
          paint(0, 0, 0)
        }, 160)
      }
      window.addEventListener('resize', onResizeStatic)
      return () => {
        clearTimeout(resizeTimer)
        window.removeEventListener('resize', onResizeStatic)
      }
    }

    const onPointerMove = (e) => {
      pointer.current.tx = e.clientX / window.innerWidth - 0.5
      pointer.current.ty = e.clientY / window.innerHeight - 0.5
    }

    const loop = (time) => {
      const p = pointer.current
      p.x += (p.tx - p.x) * 0.06
      p.y += (p.ty - p.y) * 0.06
      paint(time, p.x, p.y)
      raf = requestAnimationFrame(loop)
    }

    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(seedStars, 160)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('resize', onResize)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
    }
  }, [reduceMotion])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
