import { useState } from 'react'
import { AccordionItem } from '@components/AccordionItem/AccordionItem'
import { Button } from '@components/Button/Button'
import { FAQ_ITEMS } from '@pages/Home/homeContent'
import styles from './FaqSection.module.css'

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id)

  const handleToggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-heading">
      <div className={styles.headingRow}>
        <div>
          <h2 id="faq-heading" className={styles.heading}>
            Frequently Asked Questions
          </h2>
          <p className={styles.subtext}>
            Got questions? We've got answers! Check out our FAQ section to find answers to the most
            common questions about StreamVibe.
          </p>
        </div>
        <Button variant="primary">Ask a Question</Button>
      </div>
      <div className={styles.grid}>
        {FAQ_ITEMS.map((item) => (
          <AccordionItem
            key={item.id}
            id={item.id}
            index={item.id}
            question={item.question}
            answer={item.answer}
            isOpen={openId === item.id}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </section>
  )
}
