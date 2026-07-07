import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ErrorBoundary } from './ErrorBoundary'

function Bomb(): never {
  throw new Error('boom')
}

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <p>safe content</p>
      </ErrorBoundary>,
    )

    expect(screen.getByText('safe content')).toBeInTheDocument()
  })

  it('renders the fallback and calls onError when a child throws', () => {
    const onError = vi.fn()
    // React logs the caught error to the console; silence it for this test.
    vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary onError={onError}>
        <Bomb />
      </ErrorBoundary>,
    )

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(onError).toHaveBeenCalledWith(expect.any(Error), expect.anything())

    vi.restoreAllMocks()
  })
})
