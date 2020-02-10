import React from "react";
import Link from "next/link";
import SubNavMainLayout from "../../components/Studio/SubNavMainLayout";
import Events from "../../components/Studio/Events";
const AddEventLink = (
  <Link href="createEvent">
    <a>Add an Event</a>
  </Link>
);

function EventsPage() {
  return (
    <SubNavMainLayout
      page={"Events"}
      mobileHeader="Events"
      pageAction={AddEventLink}
    >
      <Events />
    </SubNavMainLayout>
  );
}

export default EventsPage;
