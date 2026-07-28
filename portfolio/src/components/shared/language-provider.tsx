'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import type { Lang } from '@/lib/translations'
import { translations } from '@/lib/translations'

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: string, vars?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children, initialLang = 'en' }: { children: React.ReactNode; initialLang?: Lang }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === 'undefined') return initialLang
    const stored = localStorage.getItem('portfolio-lang') as Lang | null
    return stored === 'en' || stored === 'es' ? stored : initialLang
  })

  const handleSetLang = useCallback((l: Lang) => {
    setLang(l)
    localStorage.setItem('portfolio-lang', l)
    document.cookie = `portfolio-lang=${l};path=/;max-age=31536000;SameSite=Lax`
    document.documentElement.setAttribute('data-lang', l)
  }, [])

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>): string => {
      const en = translations.en as Record<string, string>
      const es = translations.es as Record<string, string>
      const dict = lang === 'es' ? es : en
      let text = dict[key] ?? en[key] ?? key
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          text = text.replace(`{${k}}`, String(v))
        }
      }
      return text
    },
    [lang],
  )

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
