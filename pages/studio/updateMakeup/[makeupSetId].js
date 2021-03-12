import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import NoFilterLayout from '../../../components/Studio/NoFilterLayout'
import UpdateMakeupForm from '../../../components/Studio/UpdateMakeupForm'
import { useStudio } from '../../../components/Studio/useStudio'
import { STUDIO_MAKEUPSET_QUERY } from '../../../components/Studio/Queries'
import Error from '../../../components/Error'
import Loading from '../../../components/Loading'

const updateMakeupPage = () => {
  const router = useRouter()
  const { makeupSetId } = router.query
  //get Dance
  const { data, loading, error } = useQuery(STUDIO_MAKEUPSET_QUERY, {
    variables: { id: makeupSetId },
  })
  const studio = useStudio()
  if (loading || error) {
    return (
      <NoFilterLayout page='Makeup' selection='Edit Makeup Set'>
        <Error error={error} />
        <Loading />
      </NoFilterLayout>
    )
  }
  return (
    <NoFilterLayout
      page='Makeup'
      selection={`Edit ${data.studioMakeupSet.name}`}
    >
      <UpdateMakeupForm studio={studio} makeupSet={data.studioMakeupSet} />
    </NoFilterLayout>
  )
}

export default updateMakeupPage
