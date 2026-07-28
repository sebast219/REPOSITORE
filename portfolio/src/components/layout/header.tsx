'use client'

import { useEffect, useState } from 'react'
import LanguageToggle from '@/components/shared/language-toggle'
import { useLanguage } from '@/components/shared/language-provider'
import ThemeToggle from '@/components/shared/theme-toggle'
import ScrambleText from '@/components/shared/scramble-text'
import { cn } from '@/lib/utils'

const NAV_KEYS = ['nav.home', 'nav.projects', 'nav.services', 'nav.about', 'nav.playground'] as const
const NAV_HREFS = ['#home', '#projects', '#services', '#about', '#playground']

export default function Header() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    for (const s of sections) observer.observe(s)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <nav
      className={cn(
        'navbar fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-14 px-12 py-5 bg-[var(--background)] border-b border-transparent',
        scrolled && 'border-[var(--border)] shadow-sm',
      )}
      aria-label="Main navigation"
    >
      <a href="#home" id="logo" aria-label="Home">
        <ScrambleText as="span" text="S¥" className="logo inline-block" trigger="load" scrambleOnHover delay={0} />
      </a>
      <button
        type="button"
        className={cn('hamburger', menuOpen && 'active')}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        aria-controls="nav-links"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </button>
      <ul
        id="nav-links"
        className={cn('nav-links flex gap-14 list-none items-center', menuOpen && 'open')}
      >
        {NAV_KEYS.map((key, i) => (
          <li key={key} className="nav-item">
            <a
              href={NAV_HREFS[i]}
              aria-current={activeSection === NAV_HREFS[i].slice(1) ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {t(key)}
            </a>
          </li>
        ))}
        <li className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <a
            href="#contact"
            className="btn !px-[1.9rem] !py-[0.7rem] !text-[0.9rem] !bg-neutral-900 !text-white shadow-lg shadow-black/10"
          >
            <span className="flex items-center gap-2">
              {t('btn.contact')}
              <svg
                className="btn-arrow"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <line x1="1" y1="8" x2="13" y2="8" />
                <polyline points="9,4 13,8 9,12" />
              </svg>
            </span>
          </a>
        </li>
      </ul>
    </nav>
  )
}
