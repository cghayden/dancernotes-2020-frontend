import Card from '../styles/Card'
import styled from 'styled-components'

const EventNotes = styled.p`
  white-space: pre-wrap;
`

const EventsDisplay = ({ activeEvents, events, allRoutines }) => {
  console.log('activeEvents', activeEvents)
  // console.log('allRoutines', allRoutines)
  const eventsToDisplay = events
    .filter((event) => activeEvents.includes(event.type))
    .sort(function (a, b) {
      return a.beginDate < b.beginDate ? -1 : a.beginDate > b.beginDate ? 1 : 0
    })
  console.log('eventsToDisplay', eventsToDisplay)

  const allRoutineAttributes = ['all']
  // console.log('allRoutineAttributes', allRoutineAttributes)
  for (const routine of allRoutines) {
    allRoutineAttributes.push(routine.name.toLowerCase())
    if (routine.competitiveLevel) {
      allRoutineAttributes.push(routine.competitiveLevel.toLowerCase())
    }
    if (routine.ageDivision) {
      allRoutineAttributes.push(routine.ageDivision.toLowerCase())
    }
  }

  // function hasAttribute(attr) {
  //   return allRoutineAttributes.includes(attr)
  // }

  if (!eventsToDisplay.length) {
    return <p>There are no events to display</p>
  }

  return (
    <div>
      {eventsToDisplay.map((event) => {
        const eventBeginDate = new Date(event.beginDate).toLocaleString(
          'en-US',
          {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }
        )
        const eventEndDate = event.endDate
          ? new Date(event.endDate).toLocaleString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          : ''

        if (
          event.appliesTo.some((attr) => allRoutineAttributes.includes(attr))
        ) {
          return (
            <Card key={event.id}>
              <h3>{event.name}</h3>
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
          )
        }
      })}
    </div>
  )
}

export default EventsDisplay
