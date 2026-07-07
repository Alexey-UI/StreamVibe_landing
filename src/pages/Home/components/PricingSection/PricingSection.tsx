import { useState } from 'react'
import { PRICING_PLANS } from '@pages/Home/homeContent'
import { PricingCard } from '@pages/Home/components/PricingCard/PricingCard'
import { cn } from '@utils/cn'
import type { BillingCycle } from '@utils/pricing'
import styles from './PricingSection.module.css'

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')

  return (
    <section id="pricing" className={styles.section} aria-labelledby="pricing-heading">
      <div className={styles.headingRow}>
        <div>
          <h2 id="pricing-heading" className={styles.heading}>
            Choose the plan that's right for you
          </h2>
          <p className={styles.subtext}>
            Join StreamVibe and select from our flexible subscription options tailored to suit your
            viewing preferences. Get ready for non-stop entertainment!
          </p>
        </div>
        <div className={styles.toggle} role="group" aria-label="Billing cycle">
          <button
            type="button"
            className={cn(styles.toggleButton, billingCycle === 'monthly' && styles.toggleButtonActive)}
            aria-pressed={billingCycle === 'monthly'}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </button>
          <button
            type="button"
            className={cn(styles.toggleButton, billingCycle === 'yearly' && styles.toggleButtonActive)}
            aria-pressed={billingCycle === 'yearly'}
            onClick={() => setBillingCycle('yearly')}
          >
            Yearly
          </button>
        </div>
      </div>
      <div className={styles.grid}>
        {PRICING_PLANS.map((plan) => (
          <PricingCard
            key={plan.id}
            name={plan.name}
            description={plan.description}
            monthlyPrice={plan.monthlyPrice}
            billingCycle={billingCycle}
          />
        ))}
      </div>
    </section>
  )
}
