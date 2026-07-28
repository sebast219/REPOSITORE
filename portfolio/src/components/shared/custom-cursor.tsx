'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const running = useRef(false)

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    document.body.style.cursor = 'none'

    pos.current.x = window.innerWidth / 2
    pos.current.y = window.innerHeight / 2
    target.current.x = pos.current.x
    target.current.y = pos.current.y

    const THRESHOLD = 0.5

    const tick = () => {
      const dx = target.current.x - pos.current.x
      const dy = target.current.y - pos.current.y

      if (Math.abs(dx) < THRESHOLD && Math.abs(dy) < THRESHOLD) {
        pos.current.x = target.current.x
        pos.current.y = target.current.y
        running.current = false
        rafRef.current = 0
        return
      }

      pos.current.x = lerp(pos.current.x, target.current.x, 0.12)
      pos.current.y = lerp(pos.current.y, target.current.y, 0.12)

      const el = cursorRef.current
      if (el) {
        el.style.transform = `translate(${pos.current.x - 40}px, ${pos.current.y - 40}px)`
      }
      const tEl = textRef.current
      if (tEl) {
        tEl.style.transform = `translate(${pos.current.x - 40}px, ${pos.current.y - 40}px)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    const startLoop = () => {
      if (running.current) return
      running.current = true
      rafRef.current = requestAnimationFrame(tick)
    }

    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      if (!running.current) startLoop()
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    startLoop()

    const handleHoverStart = () => {
      cursorRef.current?.classList.add('is-hovering')
      if (textRef.current) textRef.current.style.opacity = '1'
    }
    const handleHoverEnd = () => {
      cursorRef.current?.classList.remove('is-hovering')
      if (textRef.current) textRef.current.style.opacity = '0'
    }

    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (
        el.closest('a, button, [role="button"], input, textarea, [tabindex]:not([tabindex="-1"])')
      ) {
        handleHoverStart()
      }
    }
    const onMouseOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (
        el.closest('a, button, [role="button"], input, textarea, [tabindex]:not([tabindex="-1"])')
      ) {
        handleHoverEnd()
      }
    }

    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(rafRef.current)
      document.body.style.cursor = ''
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="custom-cursor"
      />
      <div
        ref={textRef}
        aria-hidden="true"
        className="custom-cursor-text"
      >
        <span className="font-display text-[0.75rem] tracking-[0.15em] text-[#000]">
          OPEN
        </span>
      </div>
    </>
  )
}
