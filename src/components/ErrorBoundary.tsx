import { Component, ErrorInfo, ReactNode } from 'react'

type Props = {
  children: ReactNode
  renderOnError?: ReactNode
}

type State = {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.renderOnError || null
    }

    return this.props.children
  }
}

export default ErrorBoundary
