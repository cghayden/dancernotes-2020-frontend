import { useQuery } from '@apollo/react-hooks'
import NewStudioLayout from '../../../components/Studio/NewStudioLayout'
import MakeupSetsList from '../../../components/Studio/MakeupSetsList'
import { STUDIO_MAKEUP_QUERY } from '../../../components/Studio/Queries'
import { useContext } from 'react'
import { FilterContext } from '../../../components/Studio/FilterContext'

export default function makeupSetsIndex() {
  const { filter: userFilter } = useContext(FilterContext)
  const activeFilterChoices = Object.values(userFilter).flat()
  const { data, error, loading } = useQuery(STUDIO_MAKEUP_QUERY)

  const makeupSets = data?.myStudio ? data.myStudio.makeupSets : []

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
      page={'Makeup'}
      createLink={`/studio/makeup/createMakeupSet`}
    >
      {data && <MakeupSetsList makeupSets={makeupSets} />}
    </NewStudioLayout>
  )
}
