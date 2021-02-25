// import { useQuery } from '@apollo/client'
import NoFilterLayout from '../../components/Studio/NoFilterLayout'
import { useQuery } from '@apollo/client'

import Requests from '../../components/Studio/Requests'
import { STUDIO_REQUESTS_QUERY } from '../../components/Studio/Queries'
import Error from '../../components/Error'
import Loading from '../../components/Loading'

function RequestsPage() {
  const { data, loading, error } = useQuery(STUDIO_REQUESTS_QUERY)
  return (
    <NoFilterLayout page='Requests'>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && (
        <Requests
          enrollmentRequests={data.myStudio.enrollmentRequests}
          accessRequests={data.myStudio.accessRequests}
        />
      )}
    </NoFilterLayout>
  )
}

export default RequestsPage
