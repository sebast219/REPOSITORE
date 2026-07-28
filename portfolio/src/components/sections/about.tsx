'use client'

import Image from 'next/image'
import AnimatedGradient from '@/components/shared/animated-gradient'
import Reveal from '@/components/shared/reveal'
import ScrambleText from '@/components/shared/scramble-text'
import { useLanguage } from '@/components/shared/language-provider'
import { useCountUp } from '@/hooks/use-count-up'

const stats = [
  {
    end: 2,
    suffix: '+',
    statKey: 'stat1',
  },
  {
    end: 75,
    suffix: '%',
    statKey: 'stat2',
  },
  {
    end: 10000,
    suffix: '+',
    statKey: 'stat3',
  },
]

export default function About() {
  const { t } = useLanguage()

  return (
    <section
      className="about-section relative overflow-hidden rounded-[var(--radius-lg)] mx-16 py-24 px-24 bg-[var(--color-dark-bg)] text-[var(--color-dark-text)]"
      id="about"
      aria-labelledby="about-title"
    >
      <div
        className="about-overlay absolute inset-0 bg-black/65 z-[2] pointer-events-none"
        aria-hidden="true"
      />
      <AnimatedGradient />
      <div className="about-grid grid grid-cols-[1fr_auto] gap-12 items-start relative z-[3]">
        <div className="about-content">
        <Reveal>
          <span
            className="section-label block text-[0.7rem] font-semibold tracking-[0.25em] uppercase mb-2"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            <ScrambleText text={t('about.label')} trigger="scroll" />
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="section-title font-display text-[clamp(2.5rem,5vw,4.5rem)] tracking-[0.04em] leading-none mb-6 text-white"
            id="about-title"
          >
            <ScrambleText as="span" text={t('about.title')} trigger="scroll" />
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="about-text font-body text-[1rem] leading-[1.65] max-w-[65ch] mb-2 opacity-[0.88]">
            {t('about.p1')}
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p className="about-text font-body text-[1rem] leading-[1.65] max-w-[65ch] mb-2 opacity-[0.88]">
            {t('about.p2')}
          </p>
        </Reveal>
        <Reveal delay={250}>
          <p className="about-text font-body text-[1rem] leading-[1.65] max-w-[65ch] mb-2 opacity-[0.88]">
            {t('about.p3')}
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="about-cta mt-8">
            <a href="#contact" className="btn btn-outline-light">
              {t('about.cta')}
            </a>
          </div>
        </Reveal>
        <Reveal delay={350}>
          <div className="stats-row flex gap-24 mt-16">
            {stats.map((stat) => (
              <StatItem key={stat.statKey} end={stat.end} suffix={stat.suffix} label={t(`${stat.statKey}.label`)} />
            ))}
          </div>
        </Reveal>
      </div>
      <Reveal delay={150} className="about-image flex-shrink-0">
        <div className="w-[320px] h-[420px] rounded-[var(--radius-lg)] overflow-hidden relative">
          <Image
            src="https://www.concertarchives.org/image_uploads/photo/image/1676308/large_image.jpg"
            alt="EsDeeKid concert photo"
            fill
            sizes="320px"
            className="object-cover"
          />
        </div>
      </Reveal>
      </div>
    </section>
  )
}

function StatItem({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp({ end })
  const display =
    end >= 1000
      ? `${Math.floor(count / 1000)}${count >= 1000 ? ',' : ''}${String(count % 1000).padStart(3, '0')}${suffix}`
      : `${count}${suffix}`
  return (
    <div ref={ref} className="stat-item text-left">
      <div className="stat-number font-display text-[clamp(3.5rem,7vw,6rem)] leading-none tracking-[-0.02em]">
        {display}
      </div>
      <div className="stat-label font-body text-[0.8rem] opacity-50 mt-2 tracking-[0.05em]">
        {label}
      </div>
    </div>
  )
}
