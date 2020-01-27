import React from "react";
import SubNavMainControlsLayout from "../../../components/SubNavMainControlsLayout";
import EventsContent from "../../../components/Parent/EventsContent";

function EventsPage() {
  return (
    <>
      <SubNavMainControlsLayout page="Events" action="Add Event">
        <EventsContent />
      </SubNavMainControlsLayout>
    </>
  );
}

export default EventsPage;
