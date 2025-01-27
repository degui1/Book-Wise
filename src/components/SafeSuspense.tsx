import { Suspense, SuspenseProps } from 'react'
import ErrorBoundary from './ErrorBoundary'

interface SafeSuspenseProps extends SuspenseProps {
  renderOnError?: React.ReactNode
}

export function SafeSuspense({
  children,
  fallback,
  renderOnError,
}: SafeSuspenseProps) {
  return (
    <ErrorBoundary renderOnError={renderOnError}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  )
}
