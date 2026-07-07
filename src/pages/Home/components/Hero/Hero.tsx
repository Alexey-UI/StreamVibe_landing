import { Button } from '@components/Button/Button'
import { DecorativeTileGrid } from '@components/DecorativeTileGrid/DecorativeTileGrid'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <DecorativeTileGrid columns={5} rows={4} vignette className={styles.background} />
      <div className={styles.content}>
        <h1 id="hero-heading" className={styles.heading}>
          The Best Streaming Experience
        </h1>
        <p className={styles.body}>
          StreamVibe is the best streaming experience for watching your favorite movies and shows on
          demand, anytime, anywhere. With StreamVibe, you can enjoy a wide variety of content,
          including the latest blockbusters, classic movies, popular TV shows, and more. You can also
          create your own watchlists, so you can easily find the content you want to watch.
        </p>
        <Button variant="primary" icon="play">
          Start Watching Now
        </Button>
      </div>
    </section>
  )
}
