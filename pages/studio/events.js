import React, { useState } from "react";
import StudioLayout from "../../components/Studio/StudioLayout";
import ContentHeader from "../../components/ContentHeader";
import CreateEventForm from "../../components/Studio/CreateEventForm";

function EventsPage() {
  const [showForm, toggleForm] = useState(false);
  return (
    <StudioLayout>
      <main>
        <ContentHeader page={"Events"}>
          <button onClick={() => toggleForm(!showForm)}>Create an Event</button>
        </ContentHeader>
        {showForm && <CreateEventForm />}
      </main>
    </StudioLayout>
  );
}

export default EventsPage;
