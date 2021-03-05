import { useState, useEffect } from 'react'
import Card from '../styles/Card'
import styled from 'styled-components'

const EventNotes = styled.p`
  white-space: pre-wrap;
`

export default function EventCard({ event }) {
  const [showEdit, setShowEdit] = useState(false)
  useEffect(() => setShowEdit(false), [event])

  const eventBeginDate = event.beginDate
    ? new Date(event.beginDate).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : ''
  const eventEndDate = event.endDate
    ? new Date(event.endDate).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : ''

  return (
    <Card key={event.id}>
      <h3>{event.name}</h3>
      <div className='card__section'>
        <p>
          {eventBeginDate} {eventEndDate ? ` - ${eventEndDate}` : null}
        </p>
      </div>
      <div>
        <h4>Location</h4>
        <p>{event.location}</p>
        <p>{event.address1}</p>
        <span>
          {event.city && <span>{`${event.city},`}</span>}{' '}
          <span>{event.state}</span> <span>{event.zip}</span>
        </span>
      </div>
      {event.url && (
        <div className='card__section'>
          <h4>Website</h4>
          <a rel='noreferrer noopener' href={event.url}>
            {event.url}
          </a>
        </div>
      )}
      {event.notes && (
        <div className='card__section'>
          <h4>Notes</h4>
          <EventNotes>{event.notes}</EventNotes>
        </div>
      )}
    </Card>
  )
}
