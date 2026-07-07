import { memo } from 'react'
import { DecorativeTileGrid } from '@components/DecorativeTileGrid/DecorativeTileGrid'
import { Icon } from '@components/Icon/Icon'
import styles from './CategoryCard.module.css'

export interface CategoryCardProps {
  name: string
}

/**
 * Memoized because it renders inside CategoriesSection's list, which doesn't
 * change per-item props on re-render (e.g. the scroll-arrow interactions).
 */
export const CategoryCard = memo(function CategoryCard({ name }: CategoryCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.thumbnail}>
        <DecorativeTileGrid columns={2} rows={2} />
      </div>
      <span className={styles.name}>{name}</span>
      <Icon name="chevron-right" className={styles.arrow} />
    </article>
  )
})
