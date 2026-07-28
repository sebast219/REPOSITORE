import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8 text-center">
      <h1 className="font-display text-[clamp(3rem,8vw,6rem)] tracking-[0.04em]">404</h1>
      <p className="font-body text-[1rem] text-[var(--muted-foreground)] max-w-[400px] leading-[1.65]">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="btn btn-primary">
        Go home
      </Link>
    </div>
  )
}
