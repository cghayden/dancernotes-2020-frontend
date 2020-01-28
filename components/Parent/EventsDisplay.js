import React from "react";

const EventsDisplay = ({ activeEvents }) => {
  return (
    <>
      {activeEvents.map(eventCategory => (
        <p>Display all {eventCategory}</p>
      ))}
    </>
  );
};

export default EventsDisplay;
