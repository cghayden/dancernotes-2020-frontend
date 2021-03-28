import Card from '../styles/Card';
import styled from 'styled-components';

const EventNotes = styled.p`
  white-space: pre-wrap;
`;

const EventsDisplay = ({
  activeEventTypes,
  allEvents,
  customEvents,
  allRoutines,
}) => {
  // console.log('allRoutines', allRoutines);
  const eventsToDisplay = allEvents
    .filter((event) => activeEventTypes.includes(event.type))
    .sort(function (a, b) {
      return a.beginDate < b.beginDate ? -1 : a.beginDate > b.beginDate ? 1 : 0;
    });

  if (!eventsToDisplay.length) {
    return <p>There are no events to display</p>;
  }

  function findMatchingDance(event) {
    const limitsArray = Object.entries(event.limiters);
    const matchingDances = allRoutines.filter((routine) => {
      const test = limitsArray.map((set) => {
        if (set[1][0] === 'all' || set[1].includes(routine[set[0]])) {
          return true;
        } else {
          return false;
        }
      });
      // console.log(
      //   'test results',
      //   event.name,
      //   routine.name,
      //   test,
      //   test.includes(false)
      // );
      return !test.includes(false);
    });
    // console.log('matchingDances', event.name, matchingDances);
    return matchingDances;
  }

  const filteredEvents = eventsToDisplay.filter((event) => {
    return findMatchingDance(event).length > 0;
  });
  console.log('filteredEvents', filteredEvents);

  const filteredEventsAndCustomEvents = [...filteredEvents, ...customEvents];

  return (
    <div>
      {filteredEventsAndCustomEvents.map((event) => {
        const eventBeginDate = new Date(event.beginDate).toLocaleString(
          'en-US',
          {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }
        );
        const eventEndDate = event.endDate
          ? new Date(event.endDate).toLocaleString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          : '';

        return (
          <Card key={event.id}>
            <h3>{event.name}</h3>
            <h4>{event.studio?.studioName}</h4>
            <div>
              <p>
                {eventBeginDate} {eventEndDate ? ` - ${eventEndDate}` : null}
              </p>
            </div>
            <div>
              <p>{event.location}</p>
              <p>{event.address1}</p>
              <span>
                <span>{event.city}</span>{' '}
                <span>{event.state && `, ${event.state}`}</span>{' '}
                <span>{event.zip}</span>
              </span>
            </div>
            {event.url && (
              <div className='card__section'>
                <a target='_blank' rel='noreferrer noopener' href={event.url}>
                  Event Website
                </a>
              </div>
            )}
            {event.notes && (
              <div className='card__section'>
                <EventNotes>{event.notes}</EventNotes>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default EventsDisplay;
