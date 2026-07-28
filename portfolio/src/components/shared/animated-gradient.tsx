export default function AnimatedGradient() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 20% 30%, rgba(59, 130, 246, 0.3), transparent),
            radial-gradient(ellipse 60% 50% at 80% 70%, rgba(168, 85, 247, 0.25), transparent),
            radial-gradient(ellipse 70% 40% at 50% 50%, rgba(34, 211, 238, 0.15), transparent)
          `,
        }}
      />
    </div>
  )
}
