import React from "react";
import Card from "../styles/Card";
import styled from "styled-components";

const StudioCardsDiv = styled.div`
  padding-top: 1rem;
  width: 100%;
`;

const EventsDisplay = ({ activeEvents, events, allRoutines }) => {
  // console.log("all studio events:", events);
  const displayEvents = events
    .filter(event => activeEvents.includes(event.type))
    .sort(function(a, b) {
      return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    });

  const allRoutineAttributes = ["all"];
  for (const routine of allRoutines) {
    allRoutineAttributes.push(routine.name.toLowerCase());
    if (routine.competitiveLevel) {
      allRoutineAttributes.push(routine.competitiveLevel.toLowerCase());
    }
    if (routine.ageDivision) {
      allRoutineAttributes.push(routine.ageDivision.toLowerCase());
    }
  }
  // console.log("allRoutineAttributes:", allRoutineAttributes);

  function hasAttribute(attr) {
    return allRoutineAttributes.includes(attr);
  }
  // const filteredByAttribute = displayEvents.filter(event =>
  //   event.appliesTo.some(hasAttribute)
  // );
  // console.log("displayEvents:", displayEvents);

  // console.log("filteredByAttribute:", filteredByAttribute);

  return (
    <StudioCardsDiv>
      {activeEvents.map(event => (
        <p>display all {event}s</p>
      ))}
      {displayEvents.map(event => {
        const eventDate = new Date(event.date).toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric"
        });

        if (event.appliesTo.some(attr => allRoutineAttributes.includes(attr))) {
          return (
            <Card key={event.id}>
              <p>{event.name}</p>
              <p>{eventDate}</p>
            </Card>
          );
        }
      })}
    </StudioCardsDiv>
  );
};

export default EventsDisplay;
