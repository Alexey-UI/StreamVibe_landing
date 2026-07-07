import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { PricingSection } from './PricingSection'

describe('PricingSection', () => {
  it('shows monthly prices by default', () => {
    render(<PricingSection />)
    expect(screen.getByText('$9.99')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Monthly' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('switches to computed yearly prices when the toggle is clicked', async () => {
    const user = userEvent.setup()
    render(<PricingSection />)

    await user.click(screen.getByRole('button', { name: 'Yearly' }))

    expect(screen.getByRole('button', { name: 'Yearly' })).toHaveAttribute('aria-pressed', 'true')
    // 9.99 * 12 * 0.85 = 101.898 -> $101.90
    expect(screen.getByText('$101.90')).toBeInTheDocument()
    expect(screen.queryByText('$9.99')).not.toBeInTheDocument()
  })

  it('renders all 3 plans', () => {
    render(<PricingSection />)
    expect(screen.getByRole('heading', { name: 'Basic Plan' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Standard Plan' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Premium Plan' })).toBeInTheDocument()
  })
})
