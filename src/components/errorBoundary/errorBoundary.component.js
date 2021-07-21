import React, { Component } from 'react'
import { Button } from '@material-ui/core'

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    stack: null,
    message: null,
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, stack: error.stack, message: error.message }
  }

  // componentDidCatch(error, errorInfo) {
  //   console.log(this.state.stack)
  // }

  render() {
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

export default ErrorBoundary
