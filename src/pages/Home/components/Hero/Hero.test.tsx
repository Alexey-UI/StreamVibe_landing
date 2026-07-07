import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Hero } from './Hero'

describe('Hero', () => {
  it('renders the headline and primary CTA', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { name: 'The Best Streaming Experience' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Start Watching Now' })).toBeInTheDocument()
  })
})
