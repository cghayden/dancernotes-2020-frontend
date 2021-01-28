import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import NewParentLayout from '../../../components/Parent/NewParentLayout'
import { SINGLE_ROUTINE_QUERY } from '../../../components/Parent/Queries'
// import StudioDanceCard from '../../../components/Parent/StudioDanceCard'

function routinePage() {
  const router = useRouter()
  const { routineId } = router.query

  const { data, error, loading } = useQuery(SINGLE_ROUTINE_QUERY, {
    variables: { id: routineId },
  })
  console.log('data', data)

  //   const routine = data ? singleRoutine : {}

  return (
    <NewParentLayout
      page={'Routines'}
      error={error}
      loading={loading}
      selection={`${data?.singleRoutine.name}`}
    >
      {/* {routine && <StudioDanceCard dance={danceClass} />} */}
      {data && <div>Show dance card here</div>}
    </NewParentLayout>
  )
}

export default routinePage
