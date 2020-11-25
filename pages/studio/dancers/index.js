import { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../../components/Error'
import Loading from '../../../components/Loading'
import NewStudioLayout from '../../../components/Studio/NewStudioLayout'
import Breadcrumb from '../../../components/Studio/Breadcrumb'
import AllDancerCards from '../../../components/Studio/AllDancerCards'
import { STUDIO_ALL_DANCERS_QUERY } from '../../../components/Studio/Queries'

import { FilterContext } from '../../../components/Studio/FilterContext'

export default function dancersIndex() {
  const { data, error, loading } = useQuery(STUDIO_ALL_DANCERS_QUERY)
  const { filter, setFilter } = useContext(FilterContext)

  return (
    <NewStudioLayout
      error={error}
      loading={loading}
      page={'Dancers'}
      createLink={`/studio/dancers/createDancer`}
    >
      {data && <AllDancerCards dancers={data?.studioDancers} />}
    </NewStudioLayout>
  )
}
