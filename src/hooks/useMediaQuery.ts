import { useSyncExternalStore } from 'react'

/**
 * Subscribes to a media query via useSyncExternalStore rather than
 * useState+useEffect, so there's no synchronous setState-in-effect
 * (avoids the cascading-render pitfall react-hooks/set-state-in-effect warns about).
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mediaQueryList = window.matchMedia(query)
      mediaQueryList.addEventListener('change', onStoreChange)
      return () => mediaQueryList.removeEventListener('change', onStoreChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}
