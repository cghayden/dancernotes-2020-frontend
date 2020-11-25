import { useQuery } from '@apollo/react-hooks'
import NewStudioLayout from '../../../components/Studio/NewStudioLayout'
import AllDancerCards from '../../../components/Studio/AllDancerCards'
import { STUDIO_ALL_DANCERS_QUERY } from '../../../components/Studio/Queries'
import { useStudio } from '../../../components/Studio/useStudio'
import { useContext } from 'react'
import { FilterContext } from '../../../components/Studio/FilterContext'

export default function dancersIndex() {
  const { filter: userFilter, setFilter } = useContext(FilterContext)
  const activeFilterChoices = Object.values(userFilter).flat()
  const { data, error, loading } = useQuery(STUDIO_ALL_DANCERS_QUERY)
  console.log('data', data)

  const filteredDancers = data?.studioDancers.filter((dancer) => {
    const dancerValues = []
    dancer.danceClasses.forEach((danceClass) => {
      const danceClassValues = Object.values(danceClass)
      dancerValues.push(...danceClassValues)
      // console.log('dancerValues', dancerValues)
    })
    // return true
    return activeFilterChoices?.every((filterChoice) =>
      dancerValues.includes(filterChoice)
    )
  })

  console.log('filteredDancers', filteredDancers)

  const studio = useStudio()
  // console.log('studio', studio)
  return (
    <NewStudioLayout
      error={error}
      loading={loading}
      page={'Dancers'}
      createLink={`/studio/dancers/createDancer`}
    >
      {data && <AllDancerCards dancers={filteredDancers} />}
    </NewStudioLayout>
  )
}
