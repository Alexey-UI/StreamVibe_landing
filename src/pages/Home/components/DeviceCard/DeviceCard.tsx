import { memo } from 'react'
import { Icon, type IconName } from '@components/Icon/Icon'
import styles from './DeviceCard.module.css'

export interface DeviceCardProps {
  icon: IconName
  title: string
  description: string
}

/** Memoized because it renders inside DevicesSection's fixed 6-item grid. */
export const DeviceCard = memo(function DeviceCard({ icon, title, description }: DeviceCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.iconWrapper}>
        <Icon name={icon} className={styles.icon} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </article>
  )
})
