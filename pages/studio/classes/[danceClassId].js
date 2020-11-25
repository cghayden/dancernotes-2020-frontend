import { useRouter } from 'next/router'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'
import NewStudioLayout from '../../../components/Studio/NewStudioLayout'
import {
  SubNav,
  NavSection,
  NavSectionHeading,
} from '../../../components/Studio/NewStudioNav'
import NewClassFilter from '../../../components/Studio/NewClassFilter'
import PlusSvg from '../../../components/Icons/PlusSvg'
import { ALL_DANCE_CLASSES_QUERY } from '../../../components/Studio/Queries'
import { SINGLE_DANCE_QUERY } from '../../../components/Studio/Queries'
import StudioDanceCard from '../../../components/Studio/StudioDanceCard'
import Breadcrumb from '../../../components/Studio/Breadcrumb'

function DanceClassPage() {
  const router = useRouter()
  const { danceClassId } = router.query

  const { data: danceClassQuery, error, loading } = useQuery(
    SINGLE_DANCE_QUERY,
    {
      variables: { id: danceClassId },
    }
  )

  const danceClass = danceClassQuery?.danceClass

  return (
    <NewStudioLayout
      page={'Classes'}
      error={error}
      loading={loading}
      selection={`${danceClass?.name}`}
    >
      {danceClass && <StudioDanceCard dance={danceClass} />}
    </NewStudioLayout>
  )
}

export default DanceClassPage
