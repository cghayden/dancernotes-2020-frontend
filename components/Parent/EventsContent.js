import { useState } from 'react';
import EventsFilter from './EventsFilter';
import EventsDisplay from './EventsDisplay';

function EventsContent({ allRoutines, allEvents, customEvents }) {
  const [eventFilter, setFilter] = useState({
    competition: true,
    convention: true,
    rehearsal: true,
    recital: true,
    camp: true,
    other: true,
  });

  // console.log('allEvents', allEvents);
  // const event1 = {
  //   ...allEvents[0],
  //   limiters: {
  //     ageDivision: ['all'],
  //     competitiveLevel: ['Company'],
  //     style: ['all'],
  //   },
  // };

  const adjustedEvents = allEvents.map((event) => {
    return {
      ...event,
      limiters: {
        ageDivision: event.ageDivision,
        competitiveLevel: event.competitiveLevel,
        style: event.style,
      },
    };
  });

  return (
    <>
      <EventsFilter eventFilter={eventFilter} setFilter={setFilter} />
      <EventsDisplay
        activeEventTypes={Object.keys(eventFilter).filter(
          (eventCategory) => eventFilter[eventCategory]
        )}
        allEvents={adjustedEvents}
        customEvents={customEvents}
        allRoutines={allRoutines}
      />
    </>
  );
}

export default EventsContent;
