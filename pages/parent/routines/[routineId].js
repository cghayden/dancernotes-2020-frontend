import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import NewParentLayout from '../../../components/Parent/NewParentLayout'
import { SINGLE_ROUTINE_QUERY } from '../../../components/Parent/Queries'
import ParentDanceCard from '../../../components/Parent/ParentDanceCard'
import Error from '../../../components/Error'
import Loading from '../../../components/Loading'

function routinePage() {
  const router = useRouter()
  const { routineId } = router.query

  const { data, error, loading } = useQuery(SINGLE_ROUTINE_QUERY, {
    variables: { id: routineId },
  })
  if (error || loading || !data) {
    return (
      <NewParentLayout page={'Routines'}>
        {error && <Error error={error} />}
        {loading && <Loading />}
      </NewParentLayout>
    )
  }
  return (
    <NewParentLayout
      page={'Routines'}
      selection={data ? `${data.singleRoutine.name}` : ''}
    >
      <ParentDanceCard dance={data.singleRoutine} />
    </NewParentLayout>
  )
}

export default routinePage
