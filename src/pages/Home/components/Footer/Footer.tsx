import { Icon } from '@components/Icon/Icon'
import { FOOTER_COLUMNS, LEGAL_LINKS, SOCIAL_LINKS } from '@pages/Home/homeContent'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title} className={styles.column}>
            <h3 className={styles.columnTitle}>{column.title}</h3>
            <ul className={styles.linkList}>
              {column.links.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <a href={link.href} className={styles.link}>
                      {link.label}
                    </a>
                  ) : (
                    <span className={styles.link}>{link.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Connect With Us</h3>
          <div className={styles.social}>
            {SOCIAL_LINKS.map((social) => (
              <span key={social.icon} className={styles.socialIcon} role="img" aria-label={social.label}>
                <Icon name={social.icon} />
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <span>© 2023 StreamVibe, All Rights Reserved</span>
        <div className={styles.legalLinks}>
          {LEGAL_LINKS.map((link) => (
            <span key={link.label} className={styles.link}>
              {link.label}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
