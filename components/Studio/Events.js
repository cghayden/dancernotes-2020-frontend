import React from "react";
import { STUDIO_EVENTS_QUERY } from "./Queries";
import { useQuery } from "@apollo/react-hooks";
import Card from "../styles/Card";

const Events = () => {
  const { data, loading, error } = useQuery(STUDIO_EVENTS_QUERY);
  const studioEvents = data ? data.myStudio.events : {};

  if (loading) return <p>5,6,7,8 ...</p>;
  if (error) return <Error error={error} />;
  return (
    <>
      {studioEvents.length < 1 && <p>There are no events to display</p>}
      {studioEvents.map(event => {
        const eventBeginDate = event.beginDate
          ? new Date(event.beginDate).toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric"
            })
          : "";
        const eventEndDate = event.endDate
          ? new Date(event.endDate).toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric"
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
          </Card>
        );
      })}
    </>
  );
};

export default Events;
