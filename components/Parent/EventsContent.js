import { useState } from 'react';
import EventsFilter from './EventsFilter';
import EventsDisplay from './EventsDisplay';

function EventsContent({ allRoutines, allEvents }) {
  console.log('allRoutines', allRoutines);
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
  // const event2 = {
  //   ...allEvents[1],
  //   limiters: {
  //     ageDivision: ['Senior'],
  //     competitiveLevel: ['Company'],
  //     style: ['Tap'],
  //   },
  // };
  // const event3 = {
  //   ...allEvents[2],
  //   limiters: {
  //     ageDivision: ['all'],
  //     competitiveLevel: ['Recreational'],
  //     style: ['Tap'],
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
  console.log('adjustedEvents', adjustedEvents);

  return (
    <>
      <EventsFilter eventFilter={eventFilter} setFilter={setFilter} />
      <EventsDisplay
        activeEventTypes={Object.keys(eventFilter).filter(
          (eventCategory) => eventFilter[eventCategory]
        )}
        allEvents={adjustedEvents}
        allRoutines={allRoutines}
      />
    </>
  );
}

export default EventsContent;
