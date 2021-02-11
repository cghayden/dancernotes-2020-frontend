import { useQuery } from '@apollo/react-hooks'
import CreateCustomRoutineForm from '../../../components/Parent/CreateCustomRoutineForm'
import { STUDIOS_AND_DANCERS } from '../../../components/Parent/Queries'
import CancelButton from '../../../components/CancelButton'
import ParentNoFilterLayout from '../../../components/Parent/ParentNoFilterLayout'

function createCustomRoutinePage() {
  const { data: parent, loading, error } = useQuery(STUDIOS_AND_DANCERS)

  return (
    <ParentNoFilterLayout
      page={'Create a Routine'}
      error={error}
      loading={loading}
    >
      {parent && <CreateCustomRoutineForm parent={parent.parentUser} />}
    </ParentNoFilterLayout>
  )
}

export default createCustomRoutinePage
