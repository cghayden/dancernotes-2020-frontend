import { useQuery } from '@apollo/react-hooks'
import { STUDIOS_AND_DANCERS } from '../../../components/Parent/Queries'
import NewParentLayout from '../../../components/Parent/NewParentLayout'
import CreateCustomEventForm from '../../../components/Parent/CreateCustomEventForm'
import Error from '../../../components/Error'
import Loading from '../../../components/Loading'

export default function createEventPage() {
  const { data: parent, loading, error } = useQuery(STUDIOS_AND_DANCERS)
  if (loading || error)
    return (
      <NewParentLayout error={error} loading={loading} page={'Create Event'}>
        {loading && <Loading />}
        {error && <Error error={error} />}
      </NewParentLayout>
    )

  return (
    <NewParentLayout error={error} loading={loading} page={'Create Event'}>
      <CreateCustomEventForm parent={parent.parentUser} />
    </NewParentLayout>
  )
}
