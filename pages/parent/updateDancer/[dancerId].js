import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { DANCER_QUERY } from '../../../components/Parent/Queries'
import ParentNoFilterLayout from '../../../components/Parent/ParentNoFilterLayout'
import UpdateDancerForm from '../../../components/Parent/UpdateDancerForm'
import Loading from '../../../components/Loading'
import Error from '../../../components/Error'

const updateDancePage = () => {
  const router = useRouter()
  const { dancerId } = router.query

  const { data, loading, error } = useQuery(DANCER_QUERY, {
    variables: { id: dancerId },
  })

  if (error || loading || !data) {
    return (
      <ParentNoFilterLayout page={'Dancers'}>
        {error && <Error error={error} />}
        {loading && <Loading />}
      </ParentNoFilterLayout>
    )
  }

  return (
    <ParentNoFilterLayout
      page={'Dancers'}
      selection={`Update ${data.dancer.firstName}`}
    >
      <UpdateDancerForm dancer={data.dancer} />
    </ParentNoFilterLayout>
  )
}

export default updateDancePage
