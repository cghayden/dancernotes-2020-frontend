import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import NewStudioLayout from '../../../components/Studio/NewStudioLayout'
import HairStyleCard from '../../../components/Studio/HairStyleCard'
import { STUDIO_HAIRSTYLE_QUERY } from '../../../components/Studio/Queries'

function HairStylePage() {
  const router = useRouter()
  const { hairStyleId } = router.query

  const { data, error, loading } = useQuery(STUDIO_HAIRSTYLE_QUERY, {
    variables: { id: hairStyleId },
  })

  const studioHairStyle = data?.studioHairStyle ? data.studioHairStyle : {}

  return (
    <NewStudioLayout
      page={'HairStyles'}
      error={error}
      loading={loading}
      selection={`${studioHairStyle?.name}`}
    >
      <HairStyleCard hairStyle={studioHairStyle} />
    </NewStudioLayout>
  )
}

export default HairStylePage
