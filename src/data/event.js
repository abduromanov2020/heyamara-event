// Detail resolver for the HeyAmara event pages.
//
// Every event now lives as a single fully authored object in events.js (it
// carries both the list fields and the rich detail fields). This module exposes
// a thin resolver so the detail route can look an event up by slug.

import { events } from './events.js'

// Resolve the rich detail object for a given slug.
//   - A known slug returns the fully authored event object.
//   - An unknown slug returns null so the page can redirect home.
export function getEventDetail(slug) {
  return events.find((e) => e.slug === slug) || null
}
