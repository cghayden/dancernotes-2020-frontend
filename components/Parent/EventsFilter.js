import React from "react";
import styled from "styled-components";

const EventCheckboxesDiv = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: left;
`;

const EventCheckbox = styled.div`
  padding: 0.25rem;
  display: flex;
  align-items: center;
  label {
    padding-left: 0.25rem;
    font-size: 12px;
  }
  @media (min-width: ${props => props.theme.largeScreen}) {
    font-size: 1rem;
  }
`;

function NotesSubNav({ eventFilter, setFilter }) {
  const eventCategories = ["competition", "convention", "rehearsal", "recital"];
  return (
    <EventCheckboxesDiv>
      {eventCategories.map(eventCategory => (
        <EventCheckbox key={eventCategory}>
          <input
            type="checkbox"
            checked={eventFilter[eventCategory]}
            id={eventCategory}
            name={eventCategory}
            value={eventCategory}
            onChange={() =>
              setFilter({
                ...eventFilter,
                [eventCategory]: !eventFilter[eventCategory]
              })
            }
          />
          <label
            htmlFor={eventCategory}
          >{`${eventCategory.toUpperCase()}S`}</label>
        </EventCheckbox>
      ))}
    </EventCheckboxesDiv>
  );
}
export default NotesSubNav;
