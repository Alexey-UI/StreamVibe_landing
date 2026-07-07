import '@fontsource/manrope/400.css'
import '@fontsource/manrope/700.css'
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary'
import { useDocumentMeta } from '@hooks/useDocumentMeta'
import { CategoriesSection } from './components/CategoriesSection/CategoriesSection'
import { CtaBanner } from './components/CtaBanner/CtaBanner'
import { DevicesSection } from './components/DevicesSection/DevicesSection'
import { FaqSection } from './components/FaqSection/FaqSection'
import { Footer } from './components/Footer/Footer'
import { HeaderNav } from './components/HeaderNav/HeaderNav'
import { Hero } from './components/Hero/Hero'
import { PricingSection } from './components/PricingSection/PricingSection'
import styles from './Home.module.css'

const PAGE_TITLE = 'StreamVibe — The Best Streaming Experience'
const PAGE_DESCRIPTION =
  'StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere.'

export default function Home() {
  useDocumentMeta(PAGE_TITLE, PAGE_DESCRIPTION)

  return (
    <div className={styles.page}>
      <ErrorBoundary>
        <HeaderNav />
      </ErrorBoundary>

      <main>
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
        <ErrorBoundary>
          <CategoriesSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <DevicesSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <FaqSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <PricingSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <CtaBanner />
        </ErrorBoundary>
      </main>

      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </div>
  )
}
