import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FeatureCard } from './FeatureCard'

describe('FeatureCard', () => {
  it('renders the title and description', () => {
    render(<FeatureCard title="Watch parties" description="Sync playback with friends." />)

    expect(screen.getByRole('heading', { name: 'Watch parties' })).toBeInTheDocument()
    expect(screen.getByText('Sync playback with friends.')).toBeInTheDocument()
  })
})
