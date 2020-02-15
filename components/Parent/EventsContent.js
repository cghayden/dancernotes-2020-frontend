import React, { useState } from "react";
import EventsFilter from "./EventsFilter";
import EventsDisplay from "./EventsDisplay";

const EventsContent = ({ events, allRoutines }) => {
  const [eventFilter, setFilter] = useState({
    competition: true,
    convention: true,
    rehearsal: true,
    recital: true,
    camp: true,
    other: true
  });
  return (
    <>
      <EventsFilter eventFilter={eventFilter} setFilter={setFilter} />

      <EventsDisplay
        activeEvents={Object.keys(eventFilter).filter(
          eventCategory => eventFilter[eventCategory]
        )}
        events={events}
        allRoutines={allRoutines}
      />
    </>
  );
};

export default EventsContent;
