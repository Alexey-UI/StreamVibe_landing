import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { FaqSection } from './FaqSection'

describe('FaqSection', () => {
  it('has the first item open by default', () => {
    render(<FaqSection />)
    expect(screen.getByRole('button', { name: /What is StreamVibe\?/ })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })

  it('is a single-open accordion: opening one item closes the previously open one', async () => {
    const user = userEvent.setup()
    render(<FaqSection />)

    await user.click(screen.getByRole('button', { name: /How much does StreamVibe cost\?/ }))

    expect(screen.getByRole('button', { name: /What is StreamVibe\?/ })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
    expect(screen.getByRole('button', { name: /How much does StreamVibe cost\?/ })).toHaveAttribute(
      'aria-expanded',
      'true',
    )

    const expandedButtons = screen
      .getAllByRole('button')
      .filter((button) => button.getAttribute('aria-expanded') === 'true')
    expect(expandedButtons).toHaveLength(1)
  })

  it('renders the Ask a Question button', () => {
    render(<FaqSection />)
    expect(screen.getByRole('button', { name: 'Ask a Question' })).toBeInTheDocument()
  })
})
