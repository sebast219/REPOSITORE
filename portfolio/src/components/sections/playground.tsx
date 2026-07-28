'use client'

import Image from 'next/image'
import Reveal from '@/components/shared/reveal'
import ScrambleText from '@/components/shared/scramble-text'
import { useLanguage } from '@/components/shared/language-provider'
import { useCallback, useEffect, useRef } from 'react'

const CARD_KEYS = [1, 2, 3, 4]

const QUAD = [...CARD_KEYS, ...CARD_KEYS, ...CARD_KEYS, ...CARD_KEYS]

export default function Playground() {
  const { t } = useLanguage()
  const trackRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const scrollPos = useRef(0)
  const isPaused = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const parent = track.parentElement
    if (!parent) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const step = 0.3
    let running = true

    const loop = () => {
      if (!running) return
      if (!isPaused.current) {
        scrollPos.current += step
        const maxScroll = track.scrollWidth - parent.clientWidth
        if (scrollPos.current >= maxScroll) scrollPos.current = 0
        parent.scrollLeft = scrollPos.current
      } else {
        scrollPos.current = parent.scrollLeft
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    const onResize = () => {
      if (!isPaused.current) {
        scrollPos.current = parent.scrollLeft
      }
    }

    rafRef.current = requestAnimationFrame(loop)
    window.addEventListener('resize', onResize)
    return () => {
      running = false
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const pause = useCallback(() => { isPaused.current = true }, [])
  const resume = useCallback(() => { isPaused.current = false }, [])

  return (
    <section className="container-section" id="playground" aria-labelledby="playground-title">
      <Reveal>
        <div className="section-header flex items-center justify-between mb-14">
          <div className="section-header-left flex flex-col gap-2">
            <span className="section-label font-body text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-[var(--color-text-muted)]">
              <ScrambleText text={t('playground.label')} trigger="scroll" />
            </span>
            <h2
              className="section-title font-display text-[clamp(2.5rem,5vw,4.5rem)] tracking-[0.04em] leading-none"
              id="playground-title"
            >
              <ScrambleText text={t('playground.title')} trigger="scroll" />
            </h2>
            <p className="section-subtitle font-body text-[1rem] text-[var(--color-text-secondary)] leading-[1.65]">
              <ScrambleText text={t('playground.title')} trigger="scroll" />
            </p>
          </div>
          <div className="section-line" aria-hidden="true" />
        </div>
      </Reveal>
      <Reveal delay={100}>
        <div
          className="playground-carousel overflow-x-auto mb-8"
          role="region"
          aria-label="Experimental projects carousel"
          onTouchStart={pause}
          onTouchEnd={resume}
        >
          <div
            ref={trackRef}
            role="none"
            className="playground-track flex gap-8 w-max"
          >
            {QUAD.map((cardKey, i) => (
              <div
                key={`${cardKey}-${i}`}
                className="playground-card flex-[0_0_560px] rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-border)] aspect-[3/2] relative"
              >
                <Image
                  src={`/images/playground-${cardKey}.svg`}
                  alt={`${t(`playground.card${cardKey}.title`)} project`}
                  fill
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="object-cover"
                />
                <div className="playground-card-content absolute bottom-0 left-0 right-0 p-5 pb-4 bg-gradient-to-t from-black/75 to-transparent text-white pointer-events-none">
                  <div className="playground-card-title font-display text-[1.3rem] tracking-[0.06em] mb-1">
                    {t(`playground.card${cardKey}.title`)}
                  </div>
                  <div className="playground-card-desc font-body text-[0.7rem] opacity-75 leading-[1.4]">
                    {t(`playground.card${cardKey}.desc`)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
      <Reveal delay={200}>
        <div className="playground-cta text-center">
          <a href="#projects" className="btn btn-primary">
            {t('playground.cta')}
          </a>
        </div>
      </Reveal>
    </section>
  )
}
