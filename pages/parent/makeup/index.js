import { useQuery } from '@apollo/react-hooks'
import { PARENTS_MAKEUP_QUERY } from '../../../components/Parent/Queries'
import NewParentLayout from '../../../components/Parent/NewParentLayout'
import MakeupContent from '../../../components/Parent/MakeupContent'

export default function makeupIndex() {
  const { data, loading, error } = useQuery(PARENTS_MAKEUP_QUERY)

  const parentMakeup = data ? data.parentMakeup : []

  return (
    <NewParentLayout
      error={error}
      loading={loading}
      page={'Makeup'}
      createLink={`/parent/makeup/createMakeupSet`}
    >
      {!error && !loading && <MakeupContent studios={parentMakeup.studios} />}
    </NewParentLayout>
  )
}
