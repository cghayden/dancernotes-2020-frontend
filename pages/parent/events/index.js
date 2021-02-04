import { useQuery } from '@apollo/react-hooks'
import {
  PARENT_EVENTS_QUERY,
  CUSTOM_EVENTS_QUERY,
  ALL_Rs,
} from '../../../components/Parent/Queries'
import NewParentLayout from '../../../components/Parent/NewParentLayout'
import EventsContent from '../../../components/Parent/EventsContent'

import { useParentEvents } from '../../../components/Parent/useParentEvents'

function EventsPage() {
  // const customEvents = useCustomEvents();
  //events entered by studios
  const {
    data: parentEvents,
    loading: loadingEvents,
    error: errorLoadingEvents,
  } = useQuery(PARENT_EVENTS_QUERY)
  //   console.log('parentEvents', parentEvents)

  //events entered by parent
  const {
    data: customEvents,
    loading: loadingCustomEvents,
    error: errorLoadingCustomEvents,
  } = useQuery(CUSTOM_EVENTS_QUERY)

  const {
    data: allRoutinesData,
    loading: loadingRoutines,
    error: errorLoadingRoutines,
  } = useQuery(ALL_Rs)
  const allRoutines = allRoutinesData ? allRoutinesData.allRs : []

  const loading = loadingEvents || loadingRoutines || loadingCustomEvents
  const error =
    errorLoadingEvents || errorLoadingRoutines || errorLoadingCustomEvents

  customEvents &&
    customEvents.customEvents.forEach((event) => (event.appliesTo = ['all']))

  return (
    <NewParentLayout
      error={error}
      loading={loading}
      page={'Events'}
      createLink={`/parent/events/createEvent`}
    >
      {!error && !loading && (
        <EventsContent
          allRoutines={allRoutines}
          allEvents={[
            ...customEvents.customEvents,
            ...parentEvents.parentEvents,
          ]}
        />
      )}
    </NewParentLayout>
  )
}

export default EventsPage
