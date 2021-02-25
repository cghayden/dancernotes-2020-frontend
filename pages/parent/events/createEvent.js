import { useQuery } from '@apollo/client'
import { STUDIOS_AND_DANCERS } from '../../../components/Parent/Queries'
import CreateCustomEventForm from '../../../components/Parent/CreateCustomEventForm'
import Error from '../../../components/Error'
import Loading from '../../../components/Loading'
import ParentNoFilterLayout from '../../../components/Parent/ParentNoFilterLayout'

export default function createEventPage() {
  const { data, loading, error } = useQuery(STUDIOS_AND_DANCERS)

  if (error || loading || !data) {
    return (
      <ParentNoFilterLayout page={'Create an Event'}>
        {error && <Error error={error} />}
        {loading && <Loading />}
      </ParentNoFilterLayout>
    )
  }

  return (
    <ParentNoFilterLayout page={'Create an Event'}>
      <CreateCustomEventForm parent={data.parentUser} />
    </ParentNoFilterLayout>
  )
}
