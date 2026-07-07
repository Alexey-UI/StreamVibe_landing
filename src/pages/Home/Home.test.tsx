import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Home from './Home'

describe('Home', () => {
  beforeEach(() => {
    Element.prototype.scrollBy = vi.fn()
  })

  it('renders one heading per major section', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'The Best Streaming Experience' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Explore our wide variety of categories' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: 'We provide you streaming experience across various devices.',
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Frequently Asked Questions' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: "Choose the plan that's right for you" }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Start your free trial today!' }),
    ).toBeInTheDocument()
  })

  it('sets the document title', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    expect(document.title).toBe('StreamVibe — The Best Streaming Experience')
  })
})
