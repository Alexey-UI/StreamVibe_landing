import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { useDocumentMeta } from './useDocumentMeta'

describe('useDocumentMeta', () => {
  afterEach(() => {
    document.title = ''
    document.querySelector('meta[name="description"]')?.setAttribute('content', '')
  })

  it('sets document.title', () => {
    renderHook(() => useDocumentMeta('My Title', 'My description'))
    expect(document.title).toBe('My Title')
  })

  it('sets the meta description content when the tag exists', () => {
    const meta = document.createElement('meta')
    meta.setAttribute('name', 'description')
    document.head.appendChild(meta)

    renderHook(() => useDocumentMeta('My Title', 'My description'))

    expect(meta.getAttribute('content')).toBe('My description')
    document.head.removeChild(meta)
  })
})
