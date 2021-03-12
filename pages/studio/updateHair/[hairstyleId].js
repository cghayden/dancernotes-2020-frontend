import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import NoFilterLayout from '../../../components/Studio/NoFilterLayout'
import UpdateHairStyleForm from '../../../components/Studio/UpdateHairStyleForm'
import { useStudio } from '../../../components/Studio/useStudio'
import { STUDIO_HAIRSTYLE_QUERY } from '../../../components/Studio/Queries'
import Error from '../../../components/Error'
import Loading from '../../../components/Loading'

const updateHairStylePage = () => {
  const router = useRouter()
  const { hairstyleId } = router.query
  //get Dance
  const { data, loading, error } = useQuery(STUDIO_HAIRSTYLE_QUERY, {
    variables: { id: hairstyleId },
  })
  const studio = useStudio()
  if (loading || error) {
    return (
      <NoFilterLayout page='Hairstyles' selection='Edit Hairstyle'>
        <Error error={error} />
        <Loading />
      </NoFilterLayout>
    )
  }
  return (
    <NoFilterLayout
      page='Hairstyles'
      selection={`Edit ${data.studioHairStyle.name}`}
    >
      <UpdateHairStyleForm studio={studio} hairstyle={data.studioHairStyle} />
    </NoFilterLayout>
  )
}

export default updateHairStylePage
