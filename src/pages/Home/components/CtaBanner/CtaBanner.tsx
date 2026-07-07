import { Button } from '@components/Button/Button'
import { DecorativeTileGrid } from '@components/DecorativeTileGrid/DecorativeTileGrid'
import styles from './CtaBanner.module.css'

export function CtaBanner() {
  return (
    <section className={styles.banner} aria-labelledby="cta-heading">
      <DecorativeTileGrid columns={5} rows={2} vignette className={styles.background} />
      <div className={styles.content}>
        <div>
          <h2 id="cta-heading" className={styles.heading}>
            Start your free trial today!
          </h2>
          <p className={styles.subtext}>
            This is a clear and concise call to action that encourages users to sign up for a free
            trial of StreamVibe.
          </p>
        </div>
        <Button variant="primary">Start a Free Trial</Button>
      </div>
    </section>
  )
}
