import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import NewStudioLayout from '../../../components/Studio/NewStudioLayout'
import Dancer from '../../../components/Parent/Dancer'
import { DANCER_QUERY } from '../../../components/Parent/Queries'

function DancerPage() {
  const router = useRouter()
  const { dancerId } = router.query

  const { data, error, loading } = useQuery(DANCER_QUERY, {
    variables: { id: dancerId },
  })

  return (
    <NewStudioLayout
      page={'Dancers'}
      error={error}
      loading={loading}
      selection={`${data?.dancer.firstName}`}
    >
      {data && <Dancer dancer={data.dancer} />}
    </NewStudioLayout>
  )
}

export default DancerPage
