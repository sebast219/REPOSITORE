'use client'

import Reveal from '@/components/shared/reveal'
import ScrambleText from '@/components/shared/scramble-text'
import { useLanguage } from '@/components/shared/language-provider'

function IconWindow() {
  return (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </>
  )
}

function IconLayers() {
  return (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </>
  )
}

function IconSettings() {
  return (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </>
  )
}

const TAGS = [
  ['Custom Web Solutions', 'Performance-Optimized Backends', 'RESTful API Development', 'Real-time Features'],
  ['Virtual Stores', 'Chatbot Automation', 'Payment Systems', 'WhatsApp Integration'],
  ['Business Websites', 'Professional Design', 'Lead Generation', 'Mobile Responsive'],
]

export default function Services() {
  const { t } = useLanguage()

  return (
    <section className="container-section" id="services" aria-labelledby="services-title">
      <div className="services-layout grid grid-cols-[1fr_1.5fr] gap-24 items-start">
        <Reveal className="services-left sticky top-[100px]">
          <div className="section-header flex flex-col items-start gap-2 mb-5">
            <div>
              <span className="section-label font-body text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-[var(--color-text-muted)]">
                <ScrambleText text={t('services.label')} trigger="scroll" />
              </span>
              <h2
                className="section-title font-display text-[clamp(2.5rem,5vw,4.5rem)] tracking-[0.04em] leading-none"
                id="services-title"
              >
                <ScrambleText text={t('services.title')} trigger="scroll" />
              </h2>
            </div>
            <div className="section-line" aria-hidden="true" />
          </div>
          <p className="font-body text-[1.3rem] text-[var(--color-text-secondary)] my-4 mb-8 leading-[1.65] max-w-[65ch]">
            {t('services.desc')}
          </p>
          <a href="#contact" className="btn btn-primary">
            {t('btn.lets-talk')}
          </a>
          </Reveal>
        <div className="services-right">
          {[1, 2, 3].map((i) => (
            <Reveal key={i} delay={(i - 1) * 100}>
            <div className="service-block py-16 border-b border-[var(--color-border)] first:pt-0 last:border-none">
              <div className="service-header flex items-start justify-between mb-6">
                <h3 className="service-name font-display text-[clamp(2rem,4vw,3.5rem)] tracking-[0.04em] leading-[1.05]">
                  {t(`service${i}.name`)}
                </h3>
                <svg
                  className="service-icon w-[62px] h-[62px] stroke-[var(--color-text-muted)] stroke-[1.5] fill-none flex-shrink-0"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {[IconWindow, IconLayers, IconSettings][i - 1]()}
                </svg>
              </div>
              <p className="service-desc font-body text-[1.1rem] text-[var(--color-text-secondary)] mb-8 max-w-[620px] leading-[1.65]">
                {t(`service${i}.desc`)}
              </p>
              <div className="service-tags flex gap-3 flex-wrap">
                {TAGS[i - 1].map((tag) => (
                  <span
                    key={tag}
                    className="service-tag bg-[var(--color-border)] text-[var(--color-text-secondary)] px-6 py-[10px] rounded-full font-body text-[0.9rem] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
