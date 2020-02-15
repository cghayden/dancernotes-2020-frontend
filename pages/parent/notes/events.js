import React from "react";
import Link from "next/link";
import SubNavMainControlsLayout from "../../../components/SubNavMainControlsLayout";
import EventsContent from "../../../components/Parent/EventsContent";
import NotesSubNav from "../../../components/Parent/NotesSubNav";
// import ControlPanel from "../../../components/Parent/ControlPanel";
import { useQuery } from "@apollo/react-hooks";
import {
  PARENT_EVENTS_QUERY,
  CUSTOM_EVENTS_QUERY
} from "../../../components/Parent/Queries";
import { ALL_Rs } from "../../../components/Parent/Queries";

import Error from "../../../components/Error";

function EventsPage() {
  const {
    data: parentEvents,
    loading: loadingEvents,
    error: errorLoadingEvents
  } = useQuery(PARENT_EVENTS_QUERY);
  const {
    data: customEvents,
    loading: loadingCustomEvents,
    error: errorLoadingCustomEvents
  } = useQuery(CUSTOM_EVENTS_QUERY);

  const {
    data: allRoutinesData,
    loading: loadingRoutines,
    error: errorLoadingRoutines
  } = useQuery(ALL_Rs);
  const allRoutines = allRoutinesData ? allRoutinesData.allRs : {};

  const loading = loadingEvents || loadingRoutines || loadingCustomEvents;
  const error =
    errorLoadingEvents || errorLoadingRoutines || errorLoadingCustomEvents;

  const AddEventButton = (
    <Link href="/parent/createCustomEvent">
      <a className="textOnly-primary-action">Create an Event</a>
    </Link>
  );

  if (loading || error)
    return (
      <>
        <NotesSubNav />
        <SubNavMainControlsLayout
          mobileHeader={"Notes"}
          page="Events"
          pageAction={AddEventButton}
        >
          {loading && <p>5, 6, 7, 8 ...</p>}
          {error && <Error error={error} />}
        </SubNavMainControlsLayout>
        {/* <ControlPanel/> */}
      </>
    );

  const allEvents = [
    ...customEvents.customEvents,
    ...parentEvents.parentEvents
  ];
  console.log("allEvents:", allEvents);

  return (
    <>
      <NotesSubNav />
      <SubNavMainControlsLayout
        mobileHeader={"Notes"}
        page="Events"
        pageAction={AddEventButton}
      >
        <EventsContent
          allRoutines={allRoutines}
          events={parentEvents.parentEvents}
        />
      </SubNavMainControlsLayout>
      {/* <ControlPanel/> */}
    </>
  );
}

export default EventsPage;
