import { useState } from "react";
import styled from "styled-components";

import { STUDIO_EVENTS_QUERY } from "../../components/Studio/Queries";
import { useQuery } from "@apollo/react-hooks";
import NewStudioLayout from "../../components/Studio/NewStudioLayout";
import {
  SubNav,
  NavSection,
  NavSectionHeading,
} from "../../components/Studio/NewStudioNav";

import PlusSvg from "../../components/PlusSvg";

// import Events from "../../components/Studio/Events";
import CreateEventForm from "../../components/Studio/CreateEventForm";
import EventCard from "../../components/Studio/EventCard";

const EventSelectionWindow = styled.div`
  grid-column: 4/-1;
`;

function EventsPage() {
  const [choice, setChoice] = useState();
  const [createNew, setCreateNew] = useState(false);
  const { data, loading, error } = useQuery(STUDIO_EVENTS_QUERY);
  const studioEvents = data ? data.myStudio.events : {};

  return (
    <NewStudioLayout>
      <SubNav>
        <NavSection>
          <NavSectionHeading>
            <h2>Events</h2>
            <button
              onClick={() => {
                setChoice(null);
                setCreateNew(true);
              }}
            >
              <PlusSvg />
            </button>
          </NavSectionHeading>
          {data && (
            <ul>
              {studioEvents.map((event) => (
                <button
                  className={choice === event.id ? `activeStudioNav` : null}
                  key={event.id}
                  onClick={() => {
                    setCreateNew(false);
                    setChoice({ ...event });
                  }}
                >
                  {event.name}
                </button>
              ))}
            </ul>
          )}
        </NavSection>
      </SubNav>
      <EventSelectionWindow className="selectionWindow">
        {choice && <EventCard event={choice} />}
        {createNew && <CreateEventForm />}
      </EventSelectionWindow>
    </NewStudioLayout>
  );
}

export default EventsPage;
