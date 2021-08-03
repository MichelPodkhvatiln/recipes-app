import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@material-ui/core'

interface IErrorBoundaryProps {
  children: ReactNode
}

interface IErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  public state = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): IErrorBoundaryState {
    return {
      hasError: true
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    const { hasError } = this.state
    const { children } = this.props

    if (hasError) {
      return (
        <div>
          <h1>Sorry. Something went wrong.</h1>
          <Button
            variant='outlined'
            onClick={() => window.location.reload()}
          >
            Reload page
          </Button>
        </div>
      )
    }

    return children
  }
}
