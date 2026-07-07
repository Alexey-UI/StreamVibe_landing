import { renderHook, act } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { useMediaQuery } from './useMediaQuery'

function mockMatchMedia(initialMatches: boolean) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>()

  const mql = {
    matches: initialMatches,
    addEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) => {
      listeners.add(listener)
    },
    removeEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) => {
      listeners.delete(listener)
    },
  }

  window.matchMedia = vi.fn().mockReturnValue(mql)

  return {
    emit: (matches: boolean) => {
      mql.matches = matches
      listeners.forEach((listener) => listener({ matches } as MediaQueryListEvent))
    },
  }
}

describe('useMediaQuery', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('returns the initial match state', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(true)
  })

  it('updates when the media query match changes', () => {
    const { emit } = mockMatchMedia(false)
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))

    expect(result.current).toBe(false)

    act(() => emit(true))

    expect(result.current).toBe(true)
  })
})
