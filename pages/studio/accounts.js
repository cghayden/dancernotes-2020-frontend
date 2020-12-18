import { useQuery } from '@apollo/react-hooks'
import NewStudioLayout from '../../components/Studio/NewStudioLayout'
import { STUDIO_LINKED_PARENTS } from '../../components/Studio/Queries'
import StudioAccounts from '../../components/Studio/StudioAccounts'
// import { useContext } from 'react'
// import { FilterContext } from '../../../components/Studio/FilterContext'

export default function accountsPage() {
  //   const { filter: userFilter } = useContext(FilterContext)
  //   const activeFilterChoices = Object.values(userFilter).flat()
  const { data, error, loading } = useQuery(STUDIO_LINKED_PARENTS)
  console.log('data', data)

  //   const filteredDancers = data?.studioDancers.filter((dancer) => {
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
      page={'Accounts'}
      //   createLink={`/studio/dancers/createDancer`}
    >
      {/* {error && <Error error={error} />} */}
      {/* {loading && <Loading />} */}
      {data && <StudioAccounts parents={data.studioLinkedParents} />}
    </NewStudioLayout>
  )
}
