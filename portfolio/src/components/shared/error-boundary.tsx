'use client'

import type { ErrorInfo, ReactNode } from 'react'
import { Component } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex flex-col items-center justify-center min-h-[200px] gap-3 p-8 text-center">
            <p className="font-body text-[0.9rem] text-[var(--muted-foreground)]">
              Something went wrong loading this section.
            </p>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
              className="text-[0.8rem] underline underline-offset-2 hover:opacity-60"
            >
              Try again
            </button>
          </div>
        )
      )
    }
    return this.props.children
  }
}
