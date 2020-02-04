import React, { useState } from "react";
import EventsFilter from "./EventsFilter";
import EventsDisplay from "./EventsDisplay";

const EventsContent = ({ events, allRoutines }) => {
  const [eventFilter, setFilter] = useState({
    competition: true,
    convention: false,
    rehearsal: false,
    recital: false,
    other: false
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
