import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary'

const Home = lazy(() => import('@pages/Home/Home'))
const NotFound = lazy(() => import('@pages/NotFound/NotFound'))

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
