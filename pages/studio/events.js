import React from "react";
import Link from "next/link";
import SubNavMainLayout from "../../components/Studio/SubNavMainLayout";

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
      <p>Events will go here</p>
    </SubNavMainLayout>
  );
}

export default EventsPage;
