import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Icon } from './Icon'

describe('Icon', () => {
  it('renders as decorative (no accessible role) by default', () => {
    const { container } = render(<Icon name="play" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders the requested icon path', () => {
    const { container: playContainer } = render(<Icon name="play" />)
    const { container: bellContainer } = render(<Icon name="bell" />)

    const playPath = playContainer.querySelector('path')?.getAttribute('d')
    const bellPath = bellContainer.querySelector('path')?.getAttribute('d')

    expect(playPath).toBeTruthy()
    expect(bellPath).toBeTruthy()
    expect(playPath).not.toBe(bellPath)
  })

  it('merges a custom className with the base icon class', () => {
    const { container } = render(<Icon name="search" className="custom" />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('class')).toContain('custom')
  })
})
