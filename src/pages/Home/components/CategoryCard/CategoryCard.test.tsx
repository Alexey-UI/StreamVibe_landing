import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CategoryCard } from './CategoryCard'

describe('CategoryCard', () => {
  it('renders the category name', () => {
    render(<CategoryCard name="Action" />)
    expect(screen.getByText('Action')).toBeInTheDocument()
  })
})
