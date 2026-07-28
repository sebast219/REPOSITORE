import dynamic from 'next/dynamic'
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import Hero from '@/components/sections/hero'
import Projects from '@/components/sections/projects'

const SectionLoading = () => (
  <div className="flex items-center justify-center py-32" role="status" aria-label="Loading section">
    <div className="w-6 h-6 rounded-full border-2 border-[var(--border)] border-t-[var(--foreground)] animate-spin" />
  </div>
)

const Services = dynamic(() => import('@/components/sections/services'), { loading: SectionLoading })
const About = dynamic(() => import('@/components/sections/about'), { loading: SectionLoading })
const Playground = dynamic(() => import('@/components/sections/playground'), { loading: SectionLoading })
const Contact = dynamic(() => import('@/components/sections/contact'), { loading: SectionLoading })

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <Projects />
        <Services />
        <About />
        <Playground />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
