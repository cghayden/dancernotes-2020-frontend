import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'

import UpdateCustomRoutine from '../../../components/Parent/UpdateCustomRoutine'
import CancelButton from '../../../components/CancelButton'
import {
  CUSTOM_ROUTINE_QUERY,
  STUDIOS_AND_DANCERS,
} from '../../../components/Parent/Queries'
import ParentNoFilterLayout from '../../../components/Parent/ParentNoFilterLayout'

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

  return (
    <>
      <ParentNoFilterLayout
        error={error}
        loading={loading}
        page={'Update Your Routine'}
      >
        {!loading && !error && (
          <UpdateCustomRoutine
            dance={routine.customRoutine}
            parent={parent.parentUser}
          />
        )}
      </ParentNoFilterLayout>
    </>
  )
}

export default updateDancePage
