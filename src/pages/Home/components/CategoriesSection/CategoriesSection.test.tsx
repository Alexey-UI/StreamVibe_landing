import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CategoriesSection } from './CategoriesSection'

describe('CategoriesSection', () => {
  beforeEach(() => {
    // jsdom doesn't implement scrollBy
    Element.prototype.scrollBy = vi.fn()
  })

  it('renders all category cards', () => {
    render(<CategoriesSection />)
    for (const name of ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror']) {
      expect(screen.getByText(name)).toBeInTheDocument()
    }
  })

  it('scrolls the category row right when the next arrow is clicked', async () => {
    const user = userEvent.setup()
    render(<CategoriesSection />)

    await user.click(screen.getByRole('button', { name: 'Scroll categories right' }))

    expect(Element.prototype.scrollBy).toHaveBeenCalledWith(
      expect.objectContaining({ left: expect.any(Number) }),
    )
  })

  it('makes the scrollable row keyboard-focusable', () => {
    render(<CategoriesSection />)
    expect(screen.getByTestId('categories-row')).toHaveAttribute('tabIndex', '0')
  })
})
