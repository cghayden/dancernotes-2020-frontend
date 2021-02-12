import { useQuery } from '@apollo/react-hooks'
import { PARENT_USER_QUERY } from '../../../components/Parent/Queries'
import NewParentLayout from '../../../components/Parent/NewParentLayout'
import MyProfile from '../../../components/Parent/MyProfile'

export default function makeupIndex() {
  const { data, loading, error } = useQuery(PARENT_USER_QUERY)

  if (error || loading || !data) {
    return (
      <ParentNoFilterLayout page={'My Account'}>
        {error && <Error error={error} />}
        {loading && <Loading />}
      </ParentNoFilterLayout>
    )
  }
  return (
    <NewParentLayout page={'My Account'}>
      <MyProfile parentUser={data.parentUser} />
    </NewParentLayout>
  )
}
