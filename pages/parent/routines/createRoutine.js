import { useQuery } from '@apollo/client'
import CreateCustomRoutineForm from '../../../components/Parent/CreateCustomRoutineForm'
import { STUDIOS_AND_DANCERS } from '../../../components/Parent/Queries'
import ParentNoFilterLayout from '../../../components/Parent/ParentNoFilterLayout'
import Loading from '../../../components/Loading'

function createCustomRoutinePage() {
  const { data, loading, error } = useQuery(STUDIOS_AND_DANCERS)
  if (error || loading || !data) {
    return (
      <ParentNoFilterLayout page={'Create a Routine'}>
        {error && <Error error={error} />}
        {loading && <Loading />}
      </ParentNoFilterLayout>
    )
  }
  return (
    <ParentNoFilterLayout page={'Create a Routine'}>
      <CreateCustomRoutineForm parent={data.parentUser} />
    </ParentNoFilterLayout>
  )
}

export default createCustomRoutinePage
