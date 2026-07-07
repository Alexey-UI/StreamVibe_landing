import { useEffect, useMemo, useState } from 'react'
import { FeatureCard } from '@components/FeatureCard/FeatureCard'
import styles from './Home.module.css'

const PAGE_TITLE = 'StreamVibe — Watch together, anywhere'
const PAGE_DESCRIPTION =
  'StreamVibe lets you watch and chat with friends in real time, wherever you are.'

const FEATURES = [
  { title: 'Watch parties', description: 'Sync playback with friends in real time.' },
  { title: 'Live chat', description: 'React and chat alongside the stream.' },
  { title: 'Cross-device', description: 'Pick up exactly where you left off.' },
]

export default function Home() {
  const [query, setQuery] = useState('')

  useEffect(() => {
    document.title = PAGE_TITLE

    const meta = document.querySelector('meta[name="description"]')
    meta?.setAttribute('content', PAGE_DESCRIPTION)
  }, [])

  // Recomputed only when `query` or the static FEATURES list changes — not on
  // every Home render — which is what lets FeatureCard's memo below actually
  // skip re-rendering unaffected cards instead of receiving new-but-equal props.
  const visibleFeatures = useMemo(
    () => FEATURES.filter((feature) => feature.title.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  return (
    <main className={styles.hero}>
      <h1 className={styles.title}>StreamVibe</h1>
      <p className={styles.subtitle}>{PAGE_DESCRIPTION}</p>

      <label className={styles.searchLabel} htmlFor="feature-search">
        Filter features
      </label>
      <input
        id="feature-search"
        type="search"
        className={styles.search}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search features…"
      />

      <div className={styles.features}>
        {visibleFeatures.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </main>
  )
}
