import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'

import UpdateCustomRoutine from '../../../components/Parent/UpdateCustomRoutine'
import CancelButton from '../../../components/CancelButton'
import { DANCER_QUERY } from '../../../components/Parent/Queries'
import ParentNoFilterLayout from '../../../components/Parent/ParentNoFilterLayout'
import UpdateDancerForm from '../../../components/Parent/UpdateDancerForm'

const updateDancePage = () => {
  const router = useRouter()
  const { dancerId } = router.query

  const { data, loading, error } = useQuery(DANCER_QUERY, {
    variables: { id: dancerId },
  })
  console.log('data', data)

  return (
    <ParentNoFilterLayout
      error={error}
      loading={loading}
      page={'Update Your Dancer'}
    >
      {!loading && !error && <UpdateDancerForm dancer={data.dancer} />}
    </ParentNoFilterLayout>
  )
}

export default updateDancePage
