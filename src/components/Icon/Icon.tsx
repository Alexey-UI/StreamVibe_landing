import type { SVGAttributes } from 'react'
import styles from './Icon.module.css'

export type IconName =
  | 'play'
  | 'search'
  | 'bell'
  | 'chevron-left'
  | 'chevron-right'
  | 'plus'
  | 'smartphone'
  | 'tablet'
  | 'smart-tv'
  | 'laptop'
  | 'gaming-console'
  | 'vr-headset'
  | 'facebook'
  | 'twitter'
  | 'linkedin'

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'name'> {
  name: IconName
}

const PATHS: Record<IconName, string> = {
  play: 'M8 5v14l11-7z',
  search:
    'M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 5L20.49 19zM10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8z',
  bell: 'M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22zm7-5-1.5-1.5V10a5.5 5.5 0 0 0-4-5.29V4a1.5 1.5 0 0 0-3 0v.71A5.5 5.5 0 0 0 6.5 10v5.5L5 17v1h14z',
  'chevron-left': 'M15 6l-6 6 6 6',
  'chevron-right': 'M9 6l6 6-6 6',
  plus: 'M11 5v6H5v2h6v6h2v-6h6v-2h-6V5z',
  smartphone:
    'M7 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7zm5 19a1.25 1.25 0 1 1 0-2.5A1.25 1.25 0 0 1 12 21zM17 18H7V4h10z',
  tablet:
    'M5 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H5zm7 19a1.25 1.25 0 1 1 0-2.5A1.25 1.25 0 0 1 12 21zM19 18H5V4h14z',
  'smart-tv':
    'M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm4 17h8v-2H8z',
  laptop:
    'M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v9H4zm-2 11h20l-1.2 2.4a1 1 0 0 1-.9.6H6.1a1 1 0 0 1-.9-.6z',
  'gaming-console':
    'M7 7h10a5 5 0 0 1 5 5v3a3 3 0 0 1-5.5 1.7L15 15H9l-1.5 1.7A3 3 0 0 1 2 15v-3a5 5 0 0 1 5-5zm.5 3v2H6v1.5H7.5V15H9v-1.5h1.5V12H9v-2zM16.5 9.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm2.5 2.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z',
  'vr-headset':
    'M6 6h12a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4h-2.5a2 2 0 0 1-1.6-.8L12.8 14a1 1 0 0 0-1.6 0l-1.1 1.2a2 2 0 0 1-1.6.8H6a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4zm2 4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm8 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z',
  facebook:
    'M13.5 21v-7.5H16l.4-3H13.5V8.4c0-.9.25-1.5 1.55-1.5H16.5V4.3A21 21 0 0 0 14.3 4c-2.2 0-3.7 1.3-3.7 3.8v2.7H8v3h2.6V21z',
  twitter:
    'M22 5.9a8.2 8.2 0 0 1-2.36.65 4.1 4.1 0 0 0 1.8-2.27 8.2 8.2 0 0 1-2.6 1 4.1 4.1 0 0 0-7 3.74A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.27 5.47 4.1 4.1 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.29 4.02 4.1 4.1 0 0 1-1.85.07 4.1 4.1 0 0 0 3.83 2.85A8.24 8.24 0 0 1 2 18.4a11.6 11.6 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.35-.01-.53A8.3 8.3 0 0 0 22 5.9z',
  linkedin:
    'M6.94 8.5H3.56V20h3.38zM5.25 3.6a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92zM20.44 20h.01v-6.4c0-3.13-.67-5.54-4.33-5.54-1.76 0-2.94.96-3.42 1.87h-.05V8.5H9.42V20h3.38v-5.7c0-1.5.28-2.95 2.14-2.95 1.83 0 1.86 1.71 1.86 3.05V20z',
}

/**
 * Decorative by default (aria-hidden) — pair with visible text or a parent
 * element's aria-label to keep the icon's meaning accessible.
 */
export function Icon({ name, className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ? `${styles.icon} ${className}` : styles.icon}
      fill="currentColor"
      aria-hidden="true"
      {...rest}
    >
      <path d={PATHS[name]} />
    </svg>
  )
}
