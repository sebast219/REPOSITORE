'use client'

import { useEffect, useRef } from 'react'

const CHARS = '!<>-_\\/[]{}—=+*^?@ABCXYZ'

export default function RandomGlitch() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const glitch = () => {
      const targets = document.querySelectorAll<HTMLElement>(
        '.hero-bottom span, .stat-label, .section-subtitle, .tag, .project-desc, .about-text, .service-desc, .playground-card-desc',
      )

      if (targets.length === 0) return

      const el = targets[Math.floor(Math.random() * targets.length)]
      const orig = el.textContent?.trim() || ''
      if (!orig || orig.length > 80 || el.querySelector('.dud')) return

      const totalFrames = Math.floor(Math.random() * 15) + 15
      let frame = 0

      const interval = setInterval(() => {
        if (!el.isConnected) { clearInterval(interval); return }

        let output = ''
        let done = 0
        for (let i = 0; i < orig.length; i++) {
          if (frame >= totalFrames) {
            output += orig[i]
            done++
          } else if (frame > Math.floor(totalFrames * ((i + 0.5) / orig.length))) {
            output += orig[i]
            done++
          } else {
            output += `<span class="dud">${CHARS[Math.floor(Math.random() * CHARS.length)]}</span>`
          }
        }
        el.innerHTML = output
        frame++
        if (done === orig.length) {
          clearInterval(interval)
          el.textContent = orig
        }
      }, 50 + Math.floor(Math.random() * 20))
    }

    const schedule = () => {
      const delay = 1500 + Math.floor(Math.random() * 4000)
      intervalRef.current = setTimeout(() => {
        glitch()
        schedule()
      }, delay) as unknown as ReturnType<typeof setInterval>
    }

    const initialDelay = setTimeout(schedule, 2500)
    return () => {
      clearTimeout(initialDelay)
      if (intervalRef.current) clearTimeout(intervalRef.current)
    }
  }, [])

  return null
}
