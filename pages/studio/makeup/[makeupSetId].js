import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import NewStudioLayout from '../../../components/Studio/NewStudioLayout'
import MakeupSetCard from '../../../components/Studio/MakeupSetCard'
import { STUDIO_MAKEUPSET_QUERY } from '../../../components/Studio/Queries'

function MakeupSetPage() {
  const router = useRouter()
  const { makeupSetId } = router.query

  const { data, error, loading } = useQuery(STUDIO_MAKEUPSET_QUERY, {
    variables: { id: makeupSetId },
  })

  const makeupSet = data?.studioMakeupSet ? data.studioMakeupSet : {}

  return (
    <NewStudioLayout
      page={'Makeup'}
      error={error}
      loading={loading}
      selection={`${makeupSet?.name}`}
    >
      <MakeupSetCard makeupSet={makeupSet} />
    </NewStudioLayout>
  )
}

export default MakeupSetPage
