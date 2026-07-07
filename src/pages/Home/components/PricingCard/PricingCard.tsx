import { memo } from 'react'
import { Button } from '@components/Button/Button'
import { formatPrice, getDisplayPrice, type BillingCycle } from '@utils/pricing'
import styles from './PricingCard.module.css'

export interface PricingCardProps {
  name: string
  description: string
  monthlyPrice: number
  billingCycle: BillingCycle
}

/** Memoized because it renders inside PricingSection's fixed 3-plan list. */
export const PricingCard = memo(function PricingCard({
  name,
  description,
  monthlyPrice,
  billingCycle,
}: PricingCardProps) {
  const price = getDisplayPrice(monthlyPrice, billingCycle)
  const period = billingCycle === 'monthly' ? '/month' : '/year'

  return (
    <article className={styles.card}>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
      <p className={styles.price}>
        {formatPrice(price)}
        <span className={styles.period}>{period}</span>
      </p>
      <div className={styles.actions}>
        <Button variant="outline">Start Free Trial</Button>
        <Button variant="secondary">Choose Plan</Button>
      </div>
    </article>
  )
})
