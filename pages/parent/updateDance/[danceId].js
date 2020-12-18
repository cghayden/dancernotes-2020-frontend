import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import NotesSubNav from '../../../components/Parent/NotesSubNav'
import UpdateCustomRoutine from '../../../components/Parent/UpdateCustomRoutine'
import CancelButton from '../../../components/CancelButton'
import {
  CUSTOM_ROUTINE_QUERY,
  STUDIOS_AND_DANCERS,
} from '../../../components/Parent/Queries'
import Error from '../../../components/Error'
import Loading from '../../../components/Loading'
import SubNavMainLayout from '../../../components/SubNavMainLayout'

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

  if (loading || error) {
    return (
      <>
        <NotesSubNav />
        <SubNavMainLayout mobileHeader='Notes' page={'Update Your Routine'}>
          {loading && <Loading />}
          {error && <Error error={error} />}
        </SubNavMainLayout>
      </>
    )
  }

  return (
    <>
      <NotesSubNav />
      <SubNavMainLayout
        mobileHeader='Notes'
        page={'Update Your Routine'}
        pageAction={<CancelButton />}
      >
        <UpdateCustomRoutine
          dance={routine.customRoutine}
          parent={parent.parentUser}
        />
      </SubNavMainLayout>
    </>
  )
}

export default updateDancePage
