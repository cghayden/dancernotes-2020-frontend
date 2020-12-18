import Link from 'next/link'

const EventsList = ({ events }) => {
  return (
    <ul>
      {events.map((event) => (
        <li key={event.id}>
          <Link href={`/studio/events/${event.id}`}>
            <a className='btn-selectionOption'>{event.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default EventsList
