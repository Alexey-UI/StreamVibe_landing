import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders its label', () => {
    render(<Button>Start Watching Now</Button>)
    expect(screen.getByRole('button', { name: 'Start Watching Now' })).toBeInTheDocument()
  })

  it('defaults to type="button" so it never submits a form by accident', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Choose Plan</Button>)

    await user.click(screen.getByRole('button', { name: 'Choose Plan' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders an icon when provided, still accessible by its text label', () => {
    render(
      <Button icon="play" aria-label="Start Watching Now">
        Start Watching Now
      </Button>,
    )
    expect(screen.getByRole('button', { name: 'Start Watching Now' })).toBeInTheDocument()
  })
})
