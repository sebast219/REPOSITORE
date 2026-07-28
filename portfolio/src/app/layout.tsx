import type { Metadata } from 'next'
import { cookies, headers } from 'next/headers'
import { Bebas_Neue, Space_Grotesk } from 'next/font/google'
import type { Lang } from '@/lib/translations'
import Analytics from '@/components/shared/analytics'
import JsonLd from '@/components/shared/json-ld'
import { LanguageProvider } from '@/components/shared/language-provider'
import RandomGlitch from '@/components/shared/random-glitch'
import ThemeProvider from '@/components/shared/theme-provider'
import { siteConfig } from '@/lib/site-config'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.name} Portfolio`,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  generator: 'Next.js',
  keywords: siteConfig.keywords,
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: {
    title: siteConfig.title,
    description: `Portfolio of ${siteConfig.name} — full stack developer based in Medellín.`,
    url: siteConfig.url,
    type: 'website',
    siteName: siteConfig.name,
    locale: 'en_US',
    images: [{ url: '/og-image.svg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: `Portfolio of ${siteConfig.name} — full stack developer based in Medellín.`,
    creator: siteConfig.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' },
  },
  alternates: { canonical: siteConfig.url },
  category: 'technology',
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies()
  const cookieLang = cookieStore.get('portfolio-lang')?.value

  let initialLang: Lang = 'en'
  if (cookieLang === 'es') {
    initialLang = 'es'
  } else if (!cookieLang) {
    const headersList = await headers()
    const acceptLang = headersList.get('Accept-Language') || ''
    initialLang = acceptLang.startsWith('es') ? 'es' : 'en'
  }

  return (
    <html lang={initialLang} className={`antialiased ${bebasNeue.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
        <meta name="format-detection" content="telephone=yes" />
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%E2%9C%A6%3C/text%3E%3C/svg%3E"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('portfolio-theme');
                if (!theme) {
                  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                document.documentElement.classList.toggle('dark', theme === 'dark');
                var lang = localStorage.getItem('portfolio-lang');
                if (!lang) {
                  lang = navigator.language.startsWith('es') ? 'es' : 'en';
                }
                document.documentElement.setAttribute('data-lang', lang);
                document.cookie = 'portfolio-lang=' + lang + ';path=/;max-age=31536000;SameSite=Lax';
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full">
        <Analytics />
        <RandomGlitch />
        <LanguageProvider initialLang={initialLang}>
          <ThemeProvider>{children}</ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
