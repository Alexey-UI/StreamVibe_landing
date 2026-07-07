import { describe, expect, it } from 'vitest'
import { CATEGORIES, DEVICES, FAQ_ITEMS, PRICING_PLANS } from './homeContent'

describe('homeContent', () => {
  it('has 5 categories', () => {
    expect(CATEGORIES).toHaveLength(5)
  })

  it('has 6 devices', () => {
    expect(DEVICES).toHaveLength(6)
  })

  it('has 8 FAQ items', () => {
    expect(FAQ_ITEMS).toHaveLength(8)
  })

  it('has 3 pricing plans', () => {
    expect(PRICING_PLANS).toHaveLength(3)
  })
})
