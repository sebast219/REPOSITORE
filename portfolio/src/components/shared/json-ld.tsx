import { siteConfig } from '@/lib/site-config'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  jobTitle: 'Full Stack Developer',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Medellín',
    addressCountry: 'CO',
  },
  email: siteConfig.email,
  url: siteConfig.url,
  sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
}

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  )
}
