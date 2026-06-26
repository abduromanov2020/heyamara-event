import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import About from '../components/About'
import Agenda from '../components/Agenda'
import Details from '../components/Details'
import Sidebar from '../components/Sidebar'
import MoreExperiences from '../components/MoreExperiences'
import Footer from '../components/Footer'
import RsvpModal from '../components/RsvpModal'
import { getEventDetail } from '../data/event.js'
import { EventProvider } from '../context/EventContext.jsx'

export default function EventDetailPage() {
  const { slug } = useParams()
  const event = getEventDetail(slug)
  const [rsvpOpen, setRsvpOpen] = useState(false)
  const openRsvp = () => setRsvpOpen(true)

  // Unknown slug: send the visitor back to the lineup.
  if (!event) return <Navigate to="/" replace />

  return (
    <EventProvider value={event}>
      <Nav onRequest={openRsvp} />

      <main className="flex-1">
        <Hero onRequest={openRsvp} />

        <section className="mx-auto max-w-[1400px] px-6 pb-12 pt-10 sm:px-10 lg:pt-14">
          <div className="grid gap-x-12 gap-y-14 lg:grid-cols-[1fr_380px]">
            <div className="min-w-0 space-y-16 pt-2">
              <About />
              <Agenda />
              <Details />
            </div>
            <aside className="hidden lg:block">
              <Sidebar onRequest={openRsvp} />
            </aside>
          </div>
        </section>

        <MoreExperiences />
      </main>

      <Footer />

      <RsvpModal open={rsvpOpen} onClose={() => setRsvpOpen(false)} />
    </EventProvider>
  )
}
