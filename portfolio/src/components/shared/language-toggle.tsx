'use client'

import { useLanguage } from '@/components/shared/language-provider'

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <button
      type="button"
      onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
      className="font-body text-[0.75rem] font-semibold tracking-[0.15em] uppercase text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-[var(--radius-sm)] hover:bg-[var(--muted)]"
      aria-label={`Switch language to ${lang === 'en' ? 'Spanish' : 'English'}`}
    >
      {lang === 'en' ? 'EN' : 'ES'}
    </button>
  )
}
