import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import ParentNoFilterLayout from '../../../components/Parent/ParentNoFilterLayout'
import NewDancerCard from '../../../components/Parent/NewDancerCard'
import { DANCER_QUERY } from '../../../components/Parent/Queries'

function DancerPage() {
  const router = useRouter()
  const { dancerId } = router.query

  const { data, error, loading } = useQuery(DANCER_QUERY, {
    variables: { id: dancerId },
  })
  console.log('dancer page data', data)

  return (
    <ParentNoFilterLayout
      error={error}
      loading={loading}
      page='Dancers'
      selection={`${data?.dancer.firstName}`}
    >
      {data && <NewDancerCard dancer={data.dancer} />}
    </ParentNoFilterLayout>
  )
}

export default DancerPage
