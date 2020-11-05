import styled from "styled-components";
import Card from "../styles/Card";

export default function EventCard({ event }) {
  const eventBeginDate = event.beginDate
    ? new Date(event.beginDate).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";
  const eventEndDate = event.endDate
    ? new Date(event.endDate).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <Card key={event.id}>
      <h3>{event.name}</h3>
      <div className="card__section">
        <p>
          {eventBeginDate} {eventEndDate ? ` - ${eventEndDate}` : null}
        </p>
      </div>
      <div className="card-section">
        <p>{event.location}</p>
        <p>{event.address1}</p>
        <span>
          {event.city && <span>{`${event.city},`}</span>}{" "}
          <span>{event.state}</span> <span>{event.zip}</span>
        </span>
      </div>
      {event.url && (
        <div className="card__section">
          <a rel="noreferrer noopener" href={event.url}>
            Event Website
          </a>
        </div>
      )}
      {event.notes && (
        <div className="card__section">
          <EventNotes>{event.notes}</EventNotes>
        </div>
      )}
    </Card>
  );
}
