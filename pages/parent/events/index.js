import React from 'react'
import Link from 'next/link'
import SubNavMainLayout from '../../../components/SubNavMainLayout'
import EventsContent from '../../../components/Parent/EventsContent'
import NotesSubNav from '../../../components/Parent/NotesSubNav'
import { useQuery } from '@apollo/react-hooks'
import {
  PARENT_EVENTS_QUERY,
  CUSTOM_EVENTS_QUERY,
  ALL_Rs,
} from '../../../components/Parent/Queries'
import { useParentEvents } from '../../../components/Parent/useParentEvents'
import Error from '../../../components/Error'
import NewParentLayout from '../../../components/Parent/NewParentLayout'

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
  //   console.log('customEvents', customEvents)

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

  //   const allEvents = [
  //     ...customEvents?.customEvents,
  //     ...parentEvents.parentEvents,
  //   ]
  //   console.log('allEvents', allEvents)

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
