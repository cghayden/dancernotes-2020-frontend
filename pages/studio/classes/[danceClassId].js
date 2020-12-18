import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import NewStudioLayout from '../../../components/Studio/NewStudioLayout'
import { SINGLE_DANCE_QUERY } from '../../../components/Studio/Queries'
import StudioDanceCard from '../../../components/Studio/StudioDanceCard'

function DanceClassPage() {
  const router = useRouter()
  const { danceClassId } = router.query

  const { data: danceClassQuery, error, loading } = useQuery(
    SINGLE_DANCE_QUERY,
    {
      variables: { id: danceClassId },
    }
  )

  const danceClass = danceClassQuery?.danceClass

  return (
    <NewStudioLayout
      page={'Classes'}
      error={error}
      loading={loading}
      selection={`${danceClass?.name}`}
    >
      {danceClass && <StudioDanceCard dance={danceClass} />}
    </NewStudioLayout>
  )
}

export default DanceClassPage
