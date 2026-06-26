import { createContext, useContext } from 'react'

// Holds the resolved event detail for the current route so the detail-page
// child components can read it without importing a hardcoded singleton.
const EventContext = createContext(null)

export function EventProvider({ value, children }) {
  return <EventContext.Provider value={value}>{children}</EventContext.Provider>
}

export function useEvent() {
  return useContext(EventContext)
}
