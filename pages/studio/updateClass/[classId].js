import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import UpdateDanceClass from '../../../components/Studio/UpdateDanceClass'
import Loading from '../../../components/Loading'
import Error from '../../../components/Error'
import { useStudio } from '../../../components/Studio/useStudio'
import { SINGLE_DANCE_QUERY } from '../../../components/Studio/Queries'

const updateStudioClassDancePage = () => {
  const router = useRouter()
  const { classId } = router.query
  //get Dance
  const { data, loading, error } = useQuery(SINGLE_DANCE_QUERY, {
    variables: { id: classId },
  })
  const studio = useStudio()

  return <UpdateDanceClass studio={studio} danceClass={data.danceClass} />
}

export default updateStudioClassDancePage
