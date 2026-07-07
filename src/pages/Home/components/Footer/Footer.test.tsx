import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Footer } from './Footer'

describe('Footer', () => {
  it('links the Home column items to their in-page sections', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Categories' })).toHaveAttribute('href', '#categories')
    expect(screen.getByRole('link', { name: 'Devices' })).toHaveAttribute('href', '#devices')
    expect(screen.getByRole('link', { name: 'Pricing' })).toHaveAttribute('href', '#pricing')
    expect(screen.getByRole('link', { name: 'FAQ' })).toHaveAttribute('href', '#faq')
  })

  it('renders links with no destination as plain text, not fake hrefs', () => {
    render(<Footer />)
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Contact Us' })).not.toBeInTheDocument()
  })

  it('renders the corrected copyright text', () => {
    render(<Footer />)
    expect(screen.getByText('© 2023 StreamVibe, All Rights Reserved')).toBeInTheDocument()
  })

  it('gives each social icon an accessible name', () => {
    render(<Footer />)
    expect(screen.getByRole('img', { name: 'Facebook' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Twitter' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'LinkedIn' })).toBeInTheDocument()
  })
})
