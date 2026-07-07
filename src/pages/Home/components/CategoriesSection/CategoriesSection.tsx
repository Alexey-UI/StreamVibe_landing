import { useEffect, useRef, useState } from 'react'
import { Icon } from '@components/Icon/Icon'
import { CATEGORIES } from '@pages/Home/homeContent'
import { CategoryCard } from '@pages/Home/components/CategoryCard/CategoryCard'
import styles from './CategoriesSection.module.css'

const SCROLL_AMOUNT = 220

export function CategoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [thumb, setThumb] = useState({ widthPercent: 100, leftPercent: 0 })

  useEffect(() => {
    const row = scrollRef.current
    if (!row) return

    const updateThumb = () => {
      const { scrollLeft, scrollWidth, clientWidth } = row
      const widthPercent = Math.min(100, (clientWidth / scrollWidth) * 100)
      const maxScroll = scrollWidth - clientWidth
      const leftPercent = maxScroll > 0 ? (scrollLeft / maxScroll) * (100 - widthPercent) : 0
      setThumb({ widthPercent, leftPercent })
    }

    updateThumb()
    row.addEventListener('scroll', updateThumb)
    return () => row.removeEventListener('scroll', updateThumb)
  }, [])

  const scrollBy = (delta: number) => {
    scrollRef.current?.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <section id="categories" className={styles.section} aria-labelledby="categories-heading">
      <div className={styles.headingRow}>
        <div>
          <h2 id="categories-heading" className={styles.heading}>
            Explore our wide variety of categories
          </h2>
          <p className={styles.subtext}>
            Whether you're looking for a comedy to make you laugh, a drama to make you think, or a
            documentary to learn something new
          </p>
        </div>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrowButton}
            aria-label="Scroll categories left"
            onClick={() => scrollBy(-SCROLL_AMOUNT)}
          >
            <Icon name="chevron-left" />
          </button>
          <div className={styles.track} aria-hidden="true">
            <div
              className={styles.thumb}
              style={{ width: `${thumb.widthPercent}%`, left: `${thumb.leftPercent}%` }}
            />
          </div>
          <button
            type="button"
            className={styles.arrowButton}
            aria-label="Scroll categories right"
            onClick={() => scrollBy(SCROLL_AMOUNT)}
          >
            <Icon name="chevron-right" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className={styles.row}
        tabIndex={0}
        role="group"
        aria-label="Categories"
        data-testid="categories-row"
      >
        {CATEGORIES.map((category) => (
          <CategoryCard key={category} name={category} />
        ))}
      </div>
    </section>
  )
}
