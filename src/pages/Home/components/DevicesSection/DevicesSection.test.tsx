import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DevicesSection } from './DevicesSection'

describe('DevicesSection', () => {
  it('renders all 6 device titles', () => {
    render(<DevicesSection />)
    for (const title of ['Smartphones', 'Tablet', 'Smart TV', 'Laptops', 'Gaming Consoles', 'VR Headsets']) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
    }
  })

  it('renders the shared device description verbatim for every card', () => {
    render(<DevicesSection />)
    const shared =
      'StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store'
    expect(screen.getAllByText(shared)).toHaveLength(6)
  })
})
