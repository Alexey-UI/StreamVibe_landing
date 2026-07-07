import type { CSSProperties } from 'react'
import { cn } from '@utils/cn'
import styles from './DecorativeTileGrid.module.css'

export interface DecorativeTileGridProps {
  columns: number
  rows: number
  vignette?: boolean
  className?: string
}

/**
 * Purely decorative stand-in for the Pixso design's movie-poster grid
 * backgrounds — CSS-only tiles, no copyrighted poster imagery.
 */
export function DecorativeTileGrid({
  columns,
  rows,
  vignette = false,
  className,
}: DecorativeTileGridProps) {
  const style = {
    '--tile-columns': columns,
    '--tile-rows': rows,
  } as CSSProperties

  return (
    <div
      aria-hidden="true"
      className={cn(styles.grid, vignette && styles.vignette, className)}
      style={style}
    />
  )
}
