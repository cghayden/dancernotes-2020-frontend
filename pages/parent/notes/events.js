import React from "react";
import SubNavMainControlsLayout from "../../../components/SubNavMainControlsLayout";
import EventsContent from "../../../components/Parent/EventsContent";
import NotesSubNav from "../../../components/Parent/NotesSubNav";
// import ControlPanel from "../../../components/Parent/ControlPanel";
import { useQuery } from "@apollo/react-hooks";
import { PARENT_EVENTS_QUERY } from "../../../components/Parent/Queries";
import { PARENT_USER_QUERY } from "../../../components/Parent/Queries";
import { ALL_Rs } from "../../../components/Parent/Queries";

import Error from "../../../components/Error";

function EventsPage() {
  const { data, loading: loadingEvents, error: errorLoadingEvents } = useQuery(
    PARENT_EVENTS_QUERY
  );

  // const {
  //   data: parentUserData,
  //   loading: loadingParent,
  //   error: errorLoadingParent
  // } = useQuery(PARENT_USER_QUERY);
  // const parentUser = parentUserData ? parentUserData.parentUser : {};
  const {
    data: allRoutinesData,
    loading: loadingRoutines,
    error: errorLoadingRoutines
  } = useQuery(ALL_Rs);
  const allRoutines = allRoutinesData ? allRoutinesData.allRs : {};
  // console.log("allRoutines:", allRoutines);

  const loading = loadingEvents || loadingRoutines;
  const error = errorLoadingEvents || errorLoadingRoutines;
  if (loading || error)
    return (
      <>
        <NotesSubNav />
        <SubNavMainControlsLayout
          mobileHeader={"Notes"}
          page="Events"
          // pageAction="Add Event"
        >
          {loading && <p>5, 6, 7, 8 ...</p>}
          {error && <Error error={error} />}
        </SubNavMainControlsLayout>
        {/* <ControlPanel/> */}
      </>
    );

  return (
    <>
      <NotesSubNav />
      <SubNavMainControlsLayout
        mobileHeader={"Notes"}
        page="Events"
        // pageAction="Add Event"
      >
        <EventsContent allRoutines={allRoutines} events={data.parentEvents} />
      </SubNavMainControlsLayout>
      {/* <ControlPanel/> */}
    </>
  );
}

export default EventsPage;
