import React, { useState } from 'react'
import EventsFilter from './EventsFilter'
import EventsDisplay from './EventsDisplay'

function EventsContent({
  customEvents = [],
  parentEvents = [],
  allRoutines,
  allEvents,
}) {
  const [eventFilter, setFilter] = useState({
    competition: true,
    convention: true,
    rehearsal: true,
    recital: true,
    camp: true,
    other: true,
  })
  console.log('allEvents', allEvents)

  return (
    <>
      <EventsFilter eventFilter={eventFilter} setFilter={setFilter} />
      <EventsDisplay
        activeEvents={Object.keys(eventFilter).filter(
          (eventCategory) => eventFilter[eventCategory]
        )}
        events={allEvents}
        allRoutines={allRoutines}
      />
    </>
  )
}

export default EventsContent
