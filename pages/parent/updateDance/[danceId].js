import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import {
  CUSTOM_ROUTINE_QUERY,
  STUDIOS_AND_DANCERS,
} from '../../../components/Parent/Queries'
import ParentNoFilterLayout from '../../../components/Parent/ParentNoFilterLayout'
import UpdateCustomRoutine from '../../../components/Parent/UpdateCustomRoutine'
import Error from '../../../components/Error'
import Loading from '../../../components/Loading'

const updateDancePage = () => {
  const {
    data: parent,
    loading: loadingParent,
    error: errorLoadingParent,
  } = useQuery(STUDIOS_AND_DANCERS)

  const router = useRouter()
  const { danceId } = router.query

  const {
    data: routine,
    loading: loadingRoutine,
    error: errorloadingRoutine,
  } = useQuery(CUSTOM_ROUTINE_QUERY, {
    variables: { id: danceId },
  })

  const loading = loadingParent || loadingRoutine
  const error = errorLoadingParent || errorloadingRoutine

  if (error || loading) {
    return (
      <ParentNoFilterLayout page={'Update Your Routine'}>
        {error && <Error error={error} />}
        {loading && <Loading />}
      </ParentNoFilterLayout>
    )
  }

  return (
    <ParentNoFilterLayout page={'Update Your Routine'}>
      <UpdateCustomRoutine
        dance={routine?.customRoutine}
        parent={parent?.parentUser}
      />
    </ParentNoFilterLayout>
  )
}

export default updateDancePage
