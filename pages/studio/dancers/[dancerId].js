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

  const dancer = data?.studioDancer ? data.studioDancer : {}

  return (
    <NewStudioLayout
      page={'Dancers'}
      error={error}
      loading={loading}
      selection={`${dancer?.firstName} ${dancer?.lastName}`}
    >
      <Dancer dancer={dancer} />
    </NewStudioLayout>
  )
}

export default DancerPage
