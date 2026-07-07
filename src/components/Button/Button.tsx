import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon, type IconName } from '@components/Icon/Icon'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'outline'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: ButtonVariant
  icon?: IconName
  children: ReactNode
}

export function Button({
  variant = 'primary',
  icon,
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={`${styles.button} ${styles[variant]}`} {...rest}>
      {icon && <Icon name={icon} className={styles.icon} />}
      <span>{children}</span>
    </button>
  )
}
