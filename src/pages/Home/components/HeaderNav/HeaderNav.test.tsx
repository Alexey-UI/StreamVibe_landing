import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { HeaderNav } from './HeaderNav'

function renderHeaderNav() {
  return render(
    <MemoryRouter>
      <HeaderNav />
    </MemoryRouter>,
  )
}

describe('HeaderNav', () => {
  it('marks the Home link as the current page', () => {
    renderHeaderNav()
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
  })

  it('renders non-navigable items as plain text, not fake links', () => {
    renderHeaderNav()
    expect(screen.getByText('Movies & Shows')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Movies & Shows' })).not.toBeInTheDocument()
  })

  it('gives the search and notification buttons accessible names', () => {
    renderHeaderNav()
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Notifications' })).toBeInTheDocument()
  })
})
