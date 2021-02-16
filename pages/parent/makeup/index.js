import { useQuery } from '@apollo/react-hooks'
import { PARENTS_MAKEUP_QUERY } from '../../../components/Parent/Queries'
import NewParentLayout from '../../../components/Parent/NewParentLayout'
import MakeupContent from '../../../components/Parent/MakeupContent'

export default function makeupIndex() {
  const { data, loading, error } = useQuery(PARENTS_MAKEUP_QUERY)
  if (error || loading || !data) {
    return (
      <ParentNoFilterLayout page={'Makeup'}>
        {error && <Error error={error} />}
        {loading && <Loading />}
      </ParentNoFilterLayout>
    )
  }
  return (
    <NewParentLayout
      page={'Makeup'}
      createLink={`/parent/makeup/createMakeupSet`}
    >
      <MakeupContent studios={parentMakeup.studios} />
    </NewParentLayout>
  )
}
