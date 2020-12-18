import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import NewStudioLayout from '../../../components/Studio/NewStudioLayout'
import Dancer from '../../../components/Studio/Dancer'
import { STUDIO_DANCER } from '../../../components/Studio/Queries'

function DancerPage() {
  const router = useRouter()
  const { dancerId } = router.query

  const { data, error, loading } = useQuery(STUDIO_DANCER, {
    variables: { id: dancerId },
  })

  return (
    <NewStudioLayout
      page={'Dancers'}
      error={error}
      loading={loading}
      selection={`${data?.studioDancer.firstName} ${data?.studioDancer.lastName}`}
    >
      {/* {dancer && <div>Dancer Here</div>} */}
      {data && <Dancer dancer={data.studioDancer} />}
    </NewStudioLayout>
  )
}

export default DancerPage
