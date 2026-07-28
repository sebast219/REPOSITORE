'use client'

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8 text-center">
      <h1 className="font-display text-[clamp(3rem,8vw,6rem)] tracking-[0.04em]">Oops</h1>
      <p className="font-body text-[1rem] text-[var(--muted-foreground)] max-w-[400px] leading-[1.65]">
        Something went wrong. This is probably a temporary issue.
      </p>
      <button type="button" onClick={reset} className="btn btn-primary">
        Try again
      </button>
    </div>
  )
}
