import React from "react";
import SubNavMainControlsLayout from "../../../components/SubNavMainControlsLayout";
import EventsContent from "../../../components/Parent/EventsContent";
import NotesSubNav from "../../../components/Parent/NotesSubNav";
import ControlPanel from "../../../components/Parent/ControlPanel";

function EventsPage() {
  return (
    <>
      <NotesSubNav />
      <SubNavMainControlsLayout page="Events" pageAction="Add Event">
        <EventsContent />
      </SubNavMainControlsLayout>
      {/* <ControlPanel/> */}
    </>
  );
}

export default EventsPage;
