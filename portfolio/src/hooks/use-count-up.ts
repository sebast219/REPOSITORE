'use client'

import { useEffect, useRef, useState } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  threshold?: number
}

export function useCountUp({ end, duration = 1200, threshold = 0.5 }: UseCountUpOptions) {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      const id = requestAnimationFrame(() => setCount(end))
      return () => cancelAnimationFrame(id)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [end, threshold])

  useEffect(() => {
    if (!visible) return

    const startTime = performance.now()
    const startValue = Math.max(1, Math.floor(end * 0.3))

    let rafId: number

    const animate = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      const current = Math.floor(startValue + (end - startValue) * eased)
      setCount(current)
      if (p < 1) rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [visible, end, duration])

  return { count, ref }
}
