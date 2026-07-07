export type BillingCycle = 'monthly' | 'yearly'

const YEARLY_DISCOUNT = 0.15

/**
 * Pixso's design only specifies monthly prices; yearly is a placeholder
 * business rule (12 months at a 15% discount) pending real pricing input.
 */
export function getDisplayPrice(monthlyPrice: number, billingCycle: BillingCycle): number {
  if (billingCycle === 'monthly') return monthlyPrice
  return monthlyPrice * 12 * (1 - YEARLY_DISCOUNT)
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`
}
