import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import NewStudioLayout from '../../../components/Studio/NewStudioLayout'
import EventCard from '../../../components/Studio/EventCard'
import { STUDIO_EVENT_QUERY } from '../../../components/Studio/Queries'
import Loading from '../../../components/Loading'
import Error from '../../../components/Error'

function EventPage() {
  const router = useRouter()
  const { eventId } = router.query

  const { data, error, loading } = useQuery(STUDIO_EVENT_QUERY, {
    variables: { id: eventId },
  })

  if (error || loading) {
    return (
      <NewStudioLayout page={'Events'}>
        <Error error={error} />
        <Loading />
      </NewStudioLayout>
    )
  }
  return (
    <NewStudioLayout page={'Events'} selection={`${data?.studioEvent?.name}`}>
      <EventCard event={data.studioEvent} />
    </NewStudioLayout>
  )
}

export default EventPage
