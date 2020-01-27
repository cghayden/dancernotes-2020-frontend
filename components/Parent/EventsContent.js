import React, { useState } from "react";
import EventsFilter from "./EventsFilter";
import EventsDisplay from "./EventsDisplay";
const EventsContent = () => {
  const [eventFilter, setFilter] = useState({
    competitions: true,
    conventions: false,
    rehearsals: false,
    recital: false
  });
  return (
    <>
      <EventsFilter eventFilter={eventFilter} setFilter={setFilter} />

      <EventsDisplay
        activeEvents={Object.keys(eventFilter).filter(
          eventCategory => eventFilter[eventCategory]
        )}
      />
    </>
  );
};

export default EventsContent;
