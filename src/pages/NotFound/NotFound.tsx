import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <main className={styles.wrapper}>
      <h1>404</h1>
      <p>This page doesn't exist.</p>
    </main>
  )
}
