import { useEffect } from 'react'

/** One-shot DOM write on mount — not a subscription to an external source. */
export function useDocumentMeta(title: string, description: string): void {
  useEffect(() => {
    document.title = title

    const meta = document.querySelector('meta[name="description"]')
    meta?.setAttribute('content', description)
  }, [title, description])
}
