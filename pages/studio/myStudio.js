import Error from '../../components/Error'
import Loading from '../../components/Loading'
import { useQuery } from '@apollo/client'
import MyStudioCard from '../../components/Studio/MyStudioCard'
import NewStudioLayout from '../../components/Studio/NewStudioLayout'

import { STUDIO_USER_QUERY } from '../../components/Studio/Queries'

function myStudioPage() {
  const { data, error, loading } = useQuery(STUDIO_USER_QUERY)

  return (
    <>
      <NewStudioLayout error={error} lodaing={loading} page={'My Studio'}>
        {error && <Error error={error} />}
        {loading && <Loading />}
        {data && <MyStudioCard studio={data.myStudio} />}
      </NewStudioLayout>
    </>
  )
}

export default myStudioPage
