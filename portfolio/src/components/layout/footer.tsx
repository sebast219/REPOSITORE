import { siteConfig } from '@/lib/site-config'

export default function Footer() {

  return (
     <footer className="flex items-center justify-end px-14 max-md:px-6 py-6 font-body text-[0.9rem] max-md:text-[0.8rem] tracking-[0.25em] uppercase text-white/70 bg-[var(--color-dark-bg)] border-t border-white/10">
       <span className="flex items-center gap-2">
         <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" aria-hidden="true" />
         {siteConfig.location}
       </span>
     </footer>
  )
}
