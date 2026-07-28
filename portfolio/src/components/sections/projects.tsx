'use client'

import Image from 'next/image'
import Reveal from '@/components/shared/reveal'
import ScrambleText from '@/components/shared/scramble-text'
import { useLanguage } from '@/components/shared/language-provider'

const PROJECTS = [
  {
    key: 1,
    image: 'https://www.concertarchives.org/image_uploads/photo/image/1682087/large_image.jpg',
    tags: ['REACT™', 'NEXT//', 'TAILWIND//', 'STRIPE//'],
    featured: false,
  },
  {
    key: 2,
    image: 'https://www.concertarchives.org/image_uploads/photo/image/1676419/large_image.jpg',
    tags: ['NODE_01', 'NEST//', 'API_WHATSAPP', 'BOT//CORE'],
    featured: false,
  },
  {
    key: 3,
    image: 'https://www.concertarchives.org/image_uploads/photo/image/1676418/large_image.jpg',
    tags: ['REACT™', 'TAILWIND//', 'CMS/X', 'UI_LEGAL'],
    featured: true,
  },
]

export default function Projects() {
  const { t } = useLanguage()

  return (
    <section className="container-section" id="projects" aria-labelledby="projects-title">
      <Reveal>
        <div className="section-header flex items-center justify-between mb-14">
          <div className="section-header-left flex flex-col gap-2">
            <span className="section-label font-body text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-[var(--color-text-muted)]">
              <ScrambleText text={t('projects.label')} trigger="scroll" />
            </span>
            <h2
              className="section-title font-display text-[clamp(2.5rem,5vw,4.5rem)] tracking-[0.04em] leading-none"
              id="projects-title"
            >
              <ScrambleText text={t('projects.title')} trigger="scroll" />
            </h2>
          </div>
          <div className="section-line" aria-hidden="true" />
        </div>
      </Reveal>
      <Reveal className="projects-grid grid grid-cols-[1.32fr_1.1fr] gap-x-16 gap-y-20" delay={100}>
        {PROJECTS.map((project) => (
          <div
            key={project.key}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') e.currentTarget.click() }}
            className={`project-card block rounded-[var(--radius-lg)] overflow-hidden ${project.featured ? 'col-span-full' : ''} cursor-default`}
          >
            <div
              className="project-image w-full rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-border)] relative"
              style={{ height: project.featured ? 520 : 400 }}
            >
              <Image
                src={project.image}
                alt={`${t(`project${project.key}.title`)} preview`}
                fill
                sizes={
                  project.featured
                    ? '(max-width: 768px) 100vw, 80vw'
                    : '(max-width: 768px) 100vw, 45vw'
                }
                priority={project.key === 1}
                className="object-cover"
              />
            </div>
            <div className="project-info mt-6">
              <div className="project-title-row flex items-start justify-between gap-3 mb-2">
                <h3 className="project-title font-display text-[clamp(1.5rem,2.8vw,2.5rem)] tracking-[0.04em] leading-[1.1]">
                  {t(`project${project.key}.title`)}
                </h3>
                <svg
                  className="project-arrow w-5 h-5 flex-shrink-0 mt-1 text-[var(--color-text-muted)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
              <div className="project-tags flex gap-1 flex-wrap mb-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag bg-[var(--color-border)] text-[var(--color-text-secondary)] px-[10px] py-[3px] rounded-full font-body text-[0.6rem] font-semibold tracking-[0.1em] uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="project-desc font-body text-[0.9rem] text-[var(--color-text-secondary)] leading-[1.65] max-w-[540px]">
                {t(`project${project.key}.desc`)}
              </p>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
