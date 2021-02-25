import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import NoFilterLayout from '../../../components/Studio/NoFilterLayout'

import UpdateDanceClass from '../../../components/Studio/UpdateDanceClass'
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

  return (
    <NoFilterLayout page='Classes' selection='Edit Class'>
      <UpdateDanceClass studio={studio} danceClass={data.danceClass} />
    </NoFilterLayout>
  )
}

export default updateStudioClassDancePage
