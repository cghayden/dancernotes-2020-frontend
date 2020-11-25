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
import Dancer from '../../../components/Studio/Dancer'
import PlusSvg from '../../../components/Icons/PlusSvg'

import { STUDIO_ALL_DANCERS_QUERY } from '../../../components/Studio/Queries'
import { STUDIO_DANCER } from '../../../components/Studio/Queries'

import Breadcrumb from '../../../components/Studio/Breadcrumb'

function DancerPage() {
  const router = useRouter()
  const { dancerId } = router.query

  const { data: dancerQuery, error, loading } = useQuery(STUDIO_DANCER, {
    variables: { id: dancerId },
  })

  const dancer = dancerQuery?.studioDancer

  return (
    <NewStudioLayout
      page={'Dancers'}
      error={error}
      loading={loading}
      selection={`${dancer?.firstName} ${dancer?.lastName}`}
    >
      <Dancer dancer={dancer} />
    </NewStudioLayout>
  )
}

export default DancerPage
