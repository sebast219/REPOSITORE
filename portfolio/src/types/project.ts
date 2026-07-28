export interface Project {
  slug: string
  title: string
  description: string
  image: string
  tags: string[]
  year: number
  url?: string
  github?: string
  featured: boolean
}
