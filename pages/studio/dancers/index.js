import { useQuery } from '@apollo/react-hooks'
import Error from '../../../components/Error'
import Loading from '../../../components/Loading'
import NewStudioLayout from '../../../components/Studio/NewStudioLayout'
import Breadcrumb from '../../../components/Studio/Breadcrumb'
import AllDancerCards from '../../../components/Studio/AllDancerCards'
import { STUDIO_ALL_DANCERS_QUERY } from '../../../components/Studio/Queries'

export default function dancersIndex(props) {
  const { data, error, loading } = useQuery(STUDIO_ALL_DANCERS_QUERY)

  return (
    <NewStudioLayout
      error={error}
      loading={loading}
      page={'Dancers'}
      createLink={`/studio/dancers/createDancer`}
    >
      <div className='selectionWindow'>
        <Breadcrumb page={'Dancers'} />
        {loading && <Loading />}
        {error && <Error error={error} />}
        {data && <AllDancerCards dancers={data.studioDancers} />}
      </div>
    </NewStudioLayout>
  )
}
