import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import NewStudioLayout from '../../../components/Studio/NewStudioLayout'
import EventCard from '../../../components/Studio/EventCard'
import { STUDIO_EVENT_QUERY } from '../../../components/Studio/Queries'

function EventPage() {
  const router = useRouter()
  const { eventId } = router.query

  const { data, error, loading } = useQuery(STUDIO_EVENT_QUERY, {
    variables: { id: eventId },
  })

  const studioEvent = data?.studioEvent ? data.studioEvent : {}

  return (
    <NewStudioLayout
      page={'Events'}
      error={error}
      loading={loading}
      selection={`${studioEvent?.name}`}
    >
      <EventCard event={studioEvent} />
    </NewStudioLayout>
  )
}

export default EventPage
