'use client'

import Reveal from '@/components/shared/reveal'
import { useLanguage } from '@/components/shared/language-provider'
import { siteConfig } from '@/lib/site-config'
import ContactForm from '@/components/shared/contact-form'

export default function Contact() {
  const { t } = useLanguage()

  return (
    <section
      className="px-14 max-md:px-6 py-[144px] pb-14 max-md:py-20 max-md:pb-10 bg-[var(--color-dark-bg)] text-[var(--color-dark-text)] rounded-t-[var(--radius-lg)] mt-20"
      id="contact"
      aria-labelledby="contact-label"
    >
      <Reveal>
      <span
        className="block font-body text-[1rem] max-md:text-[0.85rem] tracking-[0.3em] uppercase font-semibold text-white/70"
        id="contact-label"
      >
        {t('contact.label')}
      </span>
      </Reveal>

      <div className="grid grid-cols-[1fr_1fr] gap-20 mt-16 max-lg:grid-cols-1 max-lg:gap-12">
        <Reveal delay={100} className="flex flex-col justify-between">
          <div className="flex flex-col gap-[7px]">
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-display text-[clamp(2.4rem,6vw,5.4rem)] tracking-[0.04em] leading-none text-white hover:opacity-35"
            >
              {siteConfig.email}
            </a>
            <span className="font-body text-[1.5rem] max-md:text-[1.2rem] tracking-[0.2em] uppercase text-white/70 font-medium mt-3">
              {siteConfig.phone}
            </span>
          </div>

          <div className="flex flex-col gap-8 mt-20 max-lg:mt-12">
            <div className="flex gap-10 font-body text-[1.2rem] max-md:text-[1rem] tracking-[0.25em] uppercase">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white"
              >
                Github
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white"
              >
                WhatsApp
              </a>
            </div>
            <div className="font-body text-[1.1rem] max-md:text-[0.9rem] tracking-[0.25em] uppercase text-white/60 leading-relaxed">
              {t('contact.online')}
              <br />
              <span>{siteConfig.location}</span>
              <br />
              <span>{t('footer.copyright', { year: new Date().getFullYear() })}</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
        <div>
          <ContactForm />
        </div>
        </Reveal>
      </div>
    </section>
  )
}
