import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import NewStudioLayout from '../../../components/Studio/NewStudioLayout'
import HairStyleCard from '../../../components/Studio/HairStyleCard'
import { STUDIO_HAIRSTYLE_QUERY } from '../../../components/Studio/Queries'
import Error from '../../../components/Error'
import Loading from '../../../components/Loading'

function HairStylePage() {
  const router = useRouter()
  const { hairStyleId } = router.query

  const { data, error, loading } = useQuery(STUDIO_HAIRSTYLE_QUERY, {
    variables: { id: hairStyleId },
  })

  const studioHairStyle = data?.studioHairStyle ? data.studioHairStyle : {}

  if (error || loading) {
    return (
      <NewStudioLayout page={'Events'}>
        <Error error={error} />
        <Loading />
      </NewStudioLayout>
    )
  }

  return (
    <NewStudioLayout page={'HairStyles'} selection={`${studioHairStyle?.name}`}>
      <HairStyleCard hairStyle={studioHairStyle} />
    </NewStudioLayout>
  )
}

export default HairStylePage
