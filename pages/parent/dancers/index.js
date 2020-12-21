import { useQuery } from '@apollo/react-hooks'
import ParentNoFilterLayout from '../../../components/Parent/ParentNoFilterLayout'
// import DancersNav from '../../../components/Parent/DancersNav'
import DancerListing from '../../../components/Parent/DancerListing'
import { PARENTS_DANCERS } from '../../../components/Parent/Queries'
// import { useContext } from 'react'
// import { FilterContext } from '../../../components/Studio/FilterContext'

export default function dancersIndex() {
  //   const { filter: userFilter } = useContext(FilterContext)
  //   const activeFilterChoices = Object.values(userFilter).flat()
  const { data, error, loading } = useQuery(PARENTS_DANCERS)

  //    const filteredDancers = data?.studioDancers.filter((dancer) => {
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
    <ParentNoFilterLayout
      error={error}
      loading={loading}
      page='Dancers'
      userType='parent'
      createLink={`/parent/dancers/createDancer`}
    >
      {data &&
        data.parentsDancers.map((dancer) => (
          <DancerListing dancer={dancer} key={dancer.id} />
        ))}
    </ParentNoFilterLayout>
  )
}
