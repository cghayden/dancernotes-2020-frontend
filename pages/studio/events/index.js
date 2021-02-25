import { useQuery } from '@apollo/client'
import NewStudioLayout from '../../../components/Studio/NewStudioLayout'
import EventsList from '../../../components/Studio/EventsList'
import { STUDIO_EVENTS_QUERY } from '../../../components/Studio/Queries'
import { useContext } from 'react'
import { FilterContext } from '../../../components/Studio/FilterContext'

export default function eventsIndex() {
  const { filter: userFilter } = useContext(FilterContext)
  const activeFilterChoices = Object.values(userFilter).flat()
  const { data, error, loading } = useQuery(STUDIO_EVENTS_QUERY)

  const events = data?.myStudio.events ? data.myStudio.events : []

  //   const filteredEvents = data?.filter((dancer) => {
  //     const dancerValues = []
  //     dancer.danceClasses.forEach((danceClass) => {
  //       const danceClassValues = Object.values(danceClass)
  //       dancerValues.push(...danceClassValues)
  //     })
  //     return activeFilterChoices?.every((filterChoice) =>
  //       dancerValues.includes(filterChoice)
  //     )
  //   })

  return (
    <NewStudioLayout
      error={error}
      loading={loading}
      page={'Events'}
      createLink={`/studio/events/createEvent`}
    >
      {data && <EventsList events={events} />}
    </NewStudioLayout>
  )
}
