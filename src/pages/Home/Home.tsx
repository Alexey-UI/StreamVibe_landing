import { useEffect } from 'react'
import styles from './Home.module.css'

const PAGE_TITLE = 'StreamVibe — Watch together, anywhere'
const PAGE_DESCRIPTION =
  'StreamVibe lets you watch and chat with friends in real time, wherever you are.'

export default function Home() {
  useEffect(() => {
    document.title = PAGE_TITLE

    const meta = document.querySelector('meta[name="description"]')
    meta?.setAttribute('content', PAGE_DESCRIPTION)
  }, [])

  return (
    <main className={styles.hero}>
      <h1 className={styles.title}>StreamVibe</h1>
      <p className={styles.subtitle}>{PAGE_DESCRIPTION}</p>
    </main>
  )
}
