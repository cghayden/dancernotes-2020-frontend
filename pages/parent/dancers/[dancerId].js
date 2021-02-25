import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import ParentNoFilterLayout from '../../../components/Parent/ParentNoFilterLayout'
import NewDancerCard from '../../../components/Parent/NewDancerCard'
import { DANCER_QUERY } from '../../../components/Parent/Queries'
import Loading from '../../../components/Loading'
import Error from '../../../components/Error'

function DancerPage() {
  const router = useRouter()
  const { dancerId } = router.query

  const { data, error, loading } = useQuery(DANCER_QUERY, {
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
      page='Dancers'
      selection={`${data?.dancer.firstName}`}
    >
      <NewDancerCard dancer={data.dancer} />
    </ParentNoFilterLayout>
  )
}

export default DancerPage
