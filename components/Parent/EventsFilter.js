import React from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

const EventsFilterStyles = styled.div``;

function NotesSubNav({ eventFilter, setFilter }) {
  // const { data, loading, error } = useQuery(PARENTS_DANCERS);
  // const dancers = data && data.parentsDancers;

  return (
    <EventsFilterStyles>
      {Object.keys(eventFilter).map(eventCategory => (
        <div>
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
          <label htmlFor={eventCategory}>{eventCategory}</label>
        </div>
      ))}
    </EventsFilterStyles>
  );
}
export default NotesSubNav;
