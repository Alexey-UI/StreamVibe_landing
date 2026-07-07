import { cn } from '@utils/cn'
import styles from './AccordionItem.module.css'

export interface AccordionItemProps {
  id: string
  index: string
  question: string
  answer: string
  isOpen: boolean
  onToggle: (id: string) => void
}

export function AccordionItem({
  id,
  index,
  question,
  answer,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  const panelId = `accordion-panel-${id}`
  const buttonId = `accordion-button-${id}`

  return (
    <div className={styles.item}>
      <h3 className={styles.heading}>
        <button
          id={buttonId}
          type="button"
          className={styles.trigger}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(id)}
        >
          <span className={styles.index}>{index}</span>
          <span className={styles.question}>{question}</span>
          <span className={cn(styles.indicator, isOpen && styles.indicatorOpen)} aria-hidden="true">
            {isOpen ? '−' : '+'}
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className={styles.panel}
      >
        <p className={styles.answer}>{answer}</p>
      </div>
    </div>
  )
}
