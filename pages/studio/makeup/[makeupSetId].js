import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import MakeupSetCard from '../../../components/Studio/MakeupSetCard'
import { STUDIO_MAKEUPSET_QUERY } from '../../../components/Studio/Queries'
import NoFilterLayout from '../../../components/Studio/NoFilterLayout'

function MakeupSetPage() {
  const router = useRouter()
  const { makeupSetId } = router.query

  const { data, error, loading } = useQuery(STUDIO_MAKEUPSET_QUERY, {
    variables: { id: makeupSetId },
  })

  const makeupSet = data?.studioMakeupSet ? data.studioMakeupSet : {}

  return (
    <NoFilterLayout
      page={'Makeup'}
      error={error}
      loading={loading}
      selection={`${makeupSet?.name}`}
    >
      <MakeupSetCard makeupSet={makeupSet} />
    </NoFilterLayout>
  )
}

export default MakeupSetPage
