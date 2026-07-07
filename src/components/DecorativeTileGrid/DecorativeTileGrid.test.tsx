import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DecorativeTileGrid } from './DecorativeTileGrid'

describe('DecorativeTileGrid', () => {
  it('is purely decorative and exposes no accessible role', () => {
    const { container } = render(<DecorativeTileGrid columns={5} rows={4} />)
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('sets tile column/row custom properties from props', () => {
    const { container } = render(<DecorativeTileGrid columns={2} rows={2} />)
    const grid = container.firstChild as HTMLElement
    expect(grid.style.getPropertyValue('--tile-columns')).toBe('2')
    expect(grid.style.getPropertyValue('--tile-rows')).toBe('2')
  })

  it('applies the vignette class only when requested', () => {
    const { container: withVignette } = render(<DecorativeTileGrid columns={5} rows={4} vignette />)
    const { container: withoutVignette } = render(<DecorativeTileGrid columns={5} rows={4} />)

    expect((withVignette.firstChild as HTMLElement).className).toMatch(/vignette/)
    expect((withoutVignette.firstChild as HTMLElement).className).not.toMatch(/vignette/)
  })
})
