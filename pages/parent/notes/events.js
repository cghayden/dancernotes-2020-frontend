import React from "react";
import Link from "next/link";
import SubNavMainLayout from "../../../components/SubNavMainLayout";
import EventsContent from "../../../components/Parent/EventsContent";
import NotesSubNav from "../../../components/Parent/NotesSubNav";
import { useQuery } from "@apollo/react-hooks";
import {
  PARENT_EVENTS_QUERY,
  CUSTOM_EVENTS_QUERY,
  ALL_Rs,
} from "../../../components/Parent/Queries";
import { useParentEvents } from "../../../components/Parent/useParentEvents";
import Error from "../../../components/Error";

function EventsPage() {
  // const customEvents = useCustomEvents();
  const {
    data: parentEvents,
    loading: loadingEvents,
    error: errorLoadingEvents,
  } = useQuery(PARENT_EVENTS_QUERY);

  const {
    data: customEvents,
    loading: loadingCustomEvents,
    error: errorLoadingCustomEvents,
  } = useQuery(CUSTOM_EVENTS_QUERY);

  const {
    data: allRoutinesData,
    loading: loadingRoutines,
    error: errorLoadingRoutines,
  } = useQuery(ALL_Rs);
  const allRoutines = allRoutinesData ? allRoutinesData.allRs : {};

  const loading = loadingEvents || loadingRoutines;
  const error = errorLoadingEvents || errorLoadingRoutines;

  const AddEventButton = (
    <Link href="/parent/createCustomEvent">
      <a className="btn-action-primary-textOnly">Create an Event</a>
    </Link>
  );

  if (loading || error)
    return (
      <>
        <NotesSubNav />
        <SubNavMainLayout
          mobileHeader={"Notes"}
          page="Events"
          pageAction={AddEventButton}
        >
          {loading && <p>5, 6, 7, 8 ...</p>}
          {error && <Error error={error} />}
        </SubNavMainLayout>
      </>
    );

  customEvents &&
    customEvents.customEvents.forEach((event) => (event.appliesTo = ["all"]));

  const allEvents = [
    ...customEvents.customEvents,
    ...parentEvents.parentEvents,
  ];
  console.log("allEvents:", allEvents);

  return (
    <>
      <NotesSubNav />
      <SubNavMainLayout
        mobileHeader={"Notes"}
        page="Events"
        pageAction={AddEventButton}
      >
        <EventsContent allRoutines={allRoutines} events={allEvents} />
      </SubNavMainLayout>
      {/* <ControlPanel/> */}
    </>
  );
}

export default EventsPage;
