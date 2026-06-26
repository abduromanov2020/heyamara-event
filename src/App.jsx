import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import CosmicBackground from './components/CosmicBackground'
import EventsListPage from './pages/EventsListPage'
import EventDetailPage from './pages/EventDetailPage'

// Reset scroll to the top on every route change.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden font-sans text-ink-200">
      {/* Reset scroll position when navigating between routes */}
      <ScrollToTop />

      {/* Shared cosmic backdrop, rendered once for every route */}
      <CosmicBackground />

      <Routes>
        <Route path="/" element={<EventsListPage />} />
        <Route path="/event/:slug" element={<EventDetailPage />} />
      </Routes>
    </div>
  )
}
