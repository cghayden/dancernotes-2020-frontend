import { useQuery } from '@apollo/react-hooks'
import NewStudioLayout from '../../../components/Studio/NewStudioLayout'
import HairStylesList from '../../../components/Studio/HairStylesList'
import { HAIRSTYLES_QUERY } from '../../../components/Studio/Queries'
import { useContext } from 'react'
import { FilterContext } from '../../../components/Studio/FilterContext'

export default function hairstylesIndex() {
  const { filter: userFilter } = useContext(FilterContext)
  const activeFilterChoices = Object.values(userFilter).flat()
  const { data, error, loading } = useQuery(HAIRSTYLES_QUERY)

  const hairStyles = data?.studioHairStyles ? data.studioHairStyles : []

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
      page={'Hair Styles'}
      createLink={`/studio/hairstyles/createHairStyle`}
    >
      {data && <HairStylesList hairStyles={hairStyles} />}
    </NewStudioLayout>
  )
}
