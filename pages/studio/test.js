import { useQuery } from '@apollo/client'
import NewStudioLayout from '../../components/Studio/NewStudioLayout'
import Loading from '../../components/Loading'
import Error from '../../components/Error'
import { STUDIO_USER_QUERY } from '../../components/Studio/useStudio'

function testPage() {
  const { data, error, loading } = useQuery(STUDIO_USER_QUERY)
  console.log('data', data)

  return (
    <NewStudioLayout page='Home'>
      {loading && <Loading />}
      {error && <Error error={error} />}
      {data && <div>Test page</div>}
    </NewStudioLayout>
  )
}

export default testPage
