import { useQuery } from '@apollo/react-hooks'
import { PARENT_USER_QUERY } from '../../../components/Parent/Queries'
import NewParentLayout from '../../../components/Parent/NewParentLayout'
import MyProfile from '../../../components/Parent/MyProfile'

export default function makeupIndex() {
  const { data, loading, error } = useQuery(PARENT_USER_QUERY)
  console.log('data', data)

  const parentUser = data ? data.parentUser : {}

  return (
    <NewParentLayout error={error} loading={loading} page={'My Account'}>
      {!error && !loading && <MyProfile parentUser={parentUser} />}
    </NewParentLayout>
  )
}
