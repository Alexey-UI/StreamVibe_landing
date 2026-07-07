import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { AccordionItem } from './AccordionItem'

describe('AccordionItem', () => {
  it('reflects isOpen via aria-expanded and hidden panel', () => {
    render(
      <AccordionItem
        id="01"
        index="01"
        question="What is StreamVibe?"
        answer="A streaming service."
        isOpen={false}
        onToggle={vi.fn()}
      />,
    )

    const trigger = screen.getByRole('button', { name: /What is StreamVibe\?/ })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText('A streaming service.')).not.toBeVisible()
  })

  it('shows the answer when isOpen is true', () => {
    render(
      <AccordionItem
        id="01"
        index="01"
        question="What is StreamVibe?"
        answer="A streaming service."
        isOpen
        onToggle={vi.fn()}
      />,
    )

    expect(screen.getByRole('button', { name: /What is StreamVibe\?/ })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    expect(screen.getByText('A streaming service.')).toBeVisible()
  })

  it('calls onToggle with its id when clicked', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(
      <AccordionItem
        id="02"
        index="02"
        question="How much does StreamVibe cost?"
        answer="See pricing."
        isOpen={false}
        onToggle={onToggle}
      />,
    )

    await user.click(screen.getByRole('button', { name: /How much does StreamVibe cost\?/ }))

    expect(onToggle).toHaveBeenCalledWith('02')
  })
})
