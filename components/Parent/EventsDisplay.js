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
      return a.beginDate < b.beginDate ? -1 : a.beginDate > b.beginDate ? 1 : 0;
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

  return (
    <StudioCardsDiv>
      {displayEvents.map(event => {
        const eventBeginDate = new Date(event.beginDate).toLocaleString(
          "en-US",
          {
            month: "long",
            day: "numeric",
            year: "numeric"
          }
        );
        const eventEndDate = event.endDate
          ? new Date(event.endDate).toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric"
            })
          : "";

        if (event.appliesTo.some(attr => allRoutineAttributes.includes(attr))) {
          return (
            <Card key={event.id}>
              <h3>{event.name}</h3>
              <div className="card__section">
                <p>
                  {eventBeginDate} {eventEndDate ? ` - ${eventEndDate}` : null}
                </p>
              </div>
              <div className="card-section">
                <p>{event.location}</p>
                <p>{event.street1}</p>
                <span>
                  <span>{event.city},</span> <span>{event.state}</span>{" "}
                  <span>{event.zip}</span>
                </span>
              </div>
              <div className="card__section">
                <a rel="noreferrer noopener" href={event.url}>
                  Event Website
                </a>
              </div>
            </Card>
          );
        }
      })}
    </StudioCardsDiv>
  );
};

export default EventsDisplay;
