import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DeviceCard } from './DeviceCard'

describe('DeviceCard', () => {
  it('renders the title and description', () => {
    render(
      <DeviceCard
        icon="smartphone"
        title="Smartphones"
        description="Optimized for iOS and Android."
      />,
    )
    expect(screen.getByRole('heading', { name: 'Smartphones' })).toBeInTheDocument()
    expect(screen.getByText('Optimized for iOS and Android.')).toBeInTheDocument()
  })
})
