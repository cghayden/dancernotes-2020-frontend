import { useQuery } from '@apollo/client'
import { PARENT_USER_QUERY } from '../../../components/Parent/Queries'
import ParentNoFilterLayout from '../../../components/Parent/ParentNoFilterLayout'
import MyProfile from '../../../components/Parent/MyProfile'
import Loading from '../../../components/Loading'
import Error from '../../../components/Error'

export default function makeupIndex() {
  const { data, loading, error } = useQuery(PARENT_USER_QUERY)

  if (error || loading || !data) {
    return (
      <ParentNoFilterLayout page={'Account'}>
        {error && <Error error={error} />}
        {loading && <Loading />}
      </ParentNoFilterLayout>
    )
  }
  return (
    <ParentNoFilterLayout page={'Account'}>
      <MyProfile parentUser={data.parentUser} />
    </ParentNoFilterLayout>
  )
}
