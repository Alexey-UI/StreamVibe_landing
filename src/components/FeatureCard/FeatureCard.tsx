import { memo } from 'react'
import styles from './FeatureCard.module.css'

export interface FeatureCardProps {
  title: string
  description: string
}

/**
 * Memoized because it renders inside a list on the home page — without
 * `memo`, every card would re-render whenever Home's state changes (e.g. the
 * search query below), even though only the filtered subset of props changed.
 */
export const FeatureCard = memo(function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <article className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </article>
  )
})
