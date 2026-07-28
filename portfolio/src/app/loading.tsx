export default function Loading() {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      role="status"
      aria-label="Loading"
    >
      <div className="w-6 h-6 rounded-full border-2 border-[var(--border)] border-t-[var(--foreground)]" />
      <span className="sr-only">Loading page...</span>
    </div>
  )
}
