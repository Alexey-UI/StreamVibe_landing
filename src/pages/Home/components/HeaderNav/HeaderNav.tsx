import { NavLink } from 'react-router-dom'
import { Icon } from '@components/Icon/Icon'
import styles from './HeaderNav.module.css'

const INERT_NAV_ITEMS = ['Movies & Shows', 'Support', 'Subscriptions']

export function HeaderNav() {
  return (
    <header className={styles.header}>
      <span className={styles.logo}>StreamVibe</span>
      <nav className={styles.nav} aria-label="Main">
        <NavLink to="/" end className={({ isActive }) => (isActive ? styles.navItemActive : styles.navItem)}>
          Home
        </NavLink>
        {INERT_NAV_ITEMS.map((item) => (
          <span key={item} className={styles.navItem}>
            {item}
          </span>
        ))}
      </nav>
      <div className={styles.actions}>
        <button type="button" className={styles.iconButton} aria-label="Search">
          <Icon name="search" />
        </button>
        <button type="button" className={styles.iconButton} aria-label="Notifications">
          <Icon name="bell" />
        </button>
      </div>
    </header>
  )
}
