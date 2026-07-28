'use client'

import ScrambleText from '@/components/shared/scramble-text'
import { useLanguage } from '@/components/shared/language-provider'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section
      className="hero min-h-screen flex flex-col justify-center px-14 py-[140px] pb-14 relative overflow-hidden"
      id="home"
      aria-label="Introduction"
    >
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('https://www.concertarchives.org/image_uploads/photo/image/1695884/large_image.jpg')" }}
        />
        <div className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2">
          <iframe
            src="https://www.youtube.com/embed/zrce_mK58lA?autoplay=1&mute=2&loop=1&playlist=zrce_mK58lA&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1"
            allow="autoplay; encrypted-media"
            className="absolute inset-0 w-full h-full pointer-events-none"
            title="Hero background video"
          />
        </div>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 text-white">
        <ScrambleText
        as="h1"
        text="SEBASTIAN"
        className="hero-line font-display text-[clamp(5rem,16vw,14rem)] leading-[0.78] tracking-[-0.02em] uppercase overflow-hidden"
        speed={30}
        delay={0}
      />
      <ScrambleText
        as="div"
        text="YEPES"
        className="hero-line font-display text-[clamp(5rem,16vw,14rem)] leading-[0.78] tracking-[-0.02em] uppercase overflow-hidden"
        speed={30}
        delay={0}
      />
      <ScrambleText
        as="div"
        text={t('hero.line3')}
        className="hero-line-sub font-display text-[clamp(2.2rem,6.5vw,5.5rem)] leading-[0.88] tracking-[0.06em] uppercase mt-2"
        speed={30}
        delay={0}
      />
      <ScrambleText
        as="div"
        text={t('hero.line4')}
        className="hero-line-sub font-display text-[clamp(2.2rem,6.5vw,5.5rem)] leading-[0.88] tracking-[0.25em] uppercase"
        speed={30}
        delay={0}
      />
      </div>
      <div className="hero-bottom absolute bottom-14 left-14 right-14 flex justify-between font-body text-[0.8rem] tracking-[0.3em] uppercase font-medium text-white/70">
        <ScrambleText as="span" text={t('hero.location')} speed={30} delay={0} />
        <ScrambleText as="span" text={String(new Date().getFullYear())} speed={30} delay={0} />
      </div>
    </section>
  )
}
