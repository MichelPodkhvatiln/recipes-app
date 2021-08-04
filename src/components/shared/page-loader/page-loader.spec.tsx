import { PageLoader } from './page-loader.component'
import { render, screen } from '@testing-library/react'

describe('PageLoader', () => {
  it('Component rendered', () => {
    render(<PageLoader />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })
})
