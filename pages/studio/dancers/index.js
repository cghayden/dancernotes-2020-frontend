import { useQuery } from '@apollo/client'
import NewStudioLayout from '../../../components/Studio/NewStudioLayout'
import Dancers from '../../../components/Studio/Dancers'
import { STUDIO_ALL_DANCERS_QUERY } from '../../../components/Studio/Queries'
import { useContext } from 'react'
import { FilterContext } from '../../../components/Studio/FilterContext'

export default function dancersIndex() {
  const { filter: userFilter } = useContext(FilterContext)
  const activeFilterChoices = Object.values(userFilter).flat()
  const { data, error, loading } = useQuery(STUDIO_ALL_DANCERS_QUERY)

  const filteredDancers = data?.studioDancers.filter((dancer) => {
    const dancerValues = []
    dancer.danceClasses.forEach((danceClass) => {
      const danceClassValues = Object.values(danceClass)
      dancerValues.push(...danceClassValues)
    })
    return activeFilterChoices?.every((filterChoice) =>
      dancerValues.includes(filterChoice)
    )
  })

  return (
    <NewStudioLayout
      error={error}
      loading={loading}
      page={'Dancers'}
      createLink={`/studio/dancers/createDancer`}
    >
      {data && <Dancers dancers={filteredDancers} />}
    </NewStudioLayout>
  )
}
