'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface ScrambleTextProps {
  text: string
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'div' | 'p'
  className?: string
  id?: string
  speed?: number
  delay?: number
  trigger?: 'load' | 'hover' | 'scroll' | 'manual'
  scrambleOnHover?: boolean
}

const CHARS = '!<>-_\\/[]{}—=+*^?@ABCXYZ'

export default function ScrambleText({
  text,
  as: Tag = 'span',
  className,
  id,
  speed = 30,
  delay = 100,
  trigger = 'load',
  scrambleOnHover = false,
}: ScrambleTextProps) {
  const elRef = useRef<HTMLSpanElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const mountedRef = useRef(true)
  const [scrambling, setScrambling] = useState(false)

  const scramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setScrambling(true)

    const length = text.length
    const totalFrames = Math.floor(Math.random() * 20) + 25
    let frame = 0

    intervalRef.current = setInterval(() => {
      if (!mountedRef.current || !elRef.current) return

      let output = ''
      let done = 0
      for (let i = 0; i < length; i++) {
        if (frame >= totalFrames) {
          output += text[i]
          done++
        } else if (frame > Math.floor(totalFrames * ((i + 0.5) / length))) {
          output += text[i]
          done++
        } else {
          output += `<span class="dud">${CHARS[Math.floor(Math.random() * CHARS.length)]}</span>`
        }
      }
      elRef.current.innerHTML = output
      frame++
      if (done === length) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setScrambling(false)
        if (elRef.current) elRef.current.textContent = text
      }
    }, speed)
  }, [text, speed])

  useEffect(() => {
    if (trigger === 'load') {
      const timer = setTimeout(scramble, delay)
      return () => clearTimeout(timer)
    }
    if (trigger === 'scroll') {
      const el = elRef.current
      if (!el) return
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return
      let timer: ReturnType<typeof setTimeout> | null = null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            timer = setTimeout(scramble, delay)
            observer.unobserve(el)
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
      )
      observer.observe(el)
      return () => {
        observer.disconnect()
        if (timer) clearTimeout(timer)
      }
    }
    return () => {
      mountedRef.current = false
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [trigger, scramble, delay])

  const handleMouseEnter = useCallback(() => {
    if (scrambleOnHover && !scrambling) scramble()
  }, [scrambleOnHover, scrambling, scramble])

  return (
    <Tag
      ref={elRef as never}
      id={id}
      className={className}
      onMouseEnter={handleMouseEnter}
      suppressHydrationWarning
    >
      {text}
    </Tag>
  )
}
