import { useQuery } from '@apollo/react-hooks'
import { PARENT_USER_QUERY } from '../../../components/Parent/Queries'
import NewParentLayout from '../../../components/Parent/NewParentLayout'
import RoutinesList from '../../../components/Parent/RoutinesList'

export default function routinesIndex() {
  //   const { data, loading, error } = useQuery(ALL_Rs)
  const { data, loading, error } = useQuery(PARENT_USER_QUERY)
  return (
    <NewParentLayout
      error={error}
      loading={loading}
      page={'Routines'}
      createLink={`/parent/routines/createRoutine`}
    >
      {data && <RoutinesList dancerIds={data.parentUser.dancersIds} />}
    </NewParentLayout>
  )
}
