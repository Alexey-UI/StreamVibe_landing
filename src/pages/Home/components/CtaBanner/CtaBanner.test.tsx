import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CtaBanner } from './CtaBanner'

describe('CtaBanner', () => {
  it('renders the corrected CTA copy', () => {
    render(<CtaBanner />)
    expect(screen.getByRole('heading', { name: 'Start your free trial today!' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Start a Free Trial' })).toBeInTheDocument()
  })
})
