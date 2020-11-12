import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { STUDIO_EVENTS_QUERY } from "../../components/Studio/Queries";
import NewStudioLayout from "../../components/Studio/NewStudioLayout";
import {
  SubNav,
  NavSection,
  NavSectionHeading,
} from "../../components/Studio/NewStudioNav";
import PlusSvg from "../../components/PlusSvg";
import CreateEventForm from "../../components/Studio/CreateEventForm";
import EventCard from "../../components/Studio/EventCard";

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
                  className={choice?.id === event.id ? `activeStudioNav` : null}
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
      <div className="selectionWindow">
        {choice && <EventCard event={choice} />}
        {createNew && <CreateEventForm />}
      </div>
    </NewStudioLayout>
  );
}

export default EventsPage;
