import { useQuery } from '@apollo/client'
import { PARENTS_MAKEUP_QUERY } from '../../../components/Parent/Queries'
import ParentNoFilterLayout from '../../../components/Parent/ParentNoFilterLayout'
import MakeupContent from '../../../components/Parent/MakeupContent'
import Error from '../../../components/Error'
import Loading from '../../../components/Loading'

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
    <ParentNoFilterLayout
      page={'Makeup'}
      createLink={`/parent/makeup/createMakeupSet`}
    >
      <MakeupContent studios={data.parentMakeup.studios} />
    </ParentNoFilterLayout>
  )
}
