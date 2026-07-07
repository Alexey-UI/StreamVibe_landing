import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PricingCard } from './PricingCard'

describe('PricingCard', () => {
  it('shows the monthly price as-is', () => {
    render(
      <PricingCard
        name="Basic Plan"
        description="Basic access."
        monthlyPrice={9.99}
        billingCycle="monthly"
      />,
    )
    expect(screen.getByText('$9.99')).toBeInTheDocument()
    expect(screen.getByText('/month')).toBeInTheDocument()
  })

  it('computes a discounted yearly price', () => {
    render(
      <PricingCard
        name="Basic Plan"
        description="Basic access."
        monthlyPrice={9.99}
        billingCycle="yearly"
      />,
    )
    // 9.99 * 12 * 0.85 = 101.898 -> $101.90
    expect(screen.getByText('$101.90')).toBeInTheDocument()
    expect(screen.getByText('/year')).toBeInTheDocument()
  })

  it('renders both plan action buttons', () => {
    render(
      <PricingCard
        name="Basic Plan"
        description="Basic access."
        monthlyPrice={9.99}
        billingCycle="monthly"
      />,
    )
    expect(screen.getByRole('button', { name: 'Start Free Trial' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Choose Plan' })).toBeInTheDocument()
  })
})
