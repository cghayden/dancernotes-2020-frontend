import { useRouter } from 'next/router'
import Link from 'next/link'
import NewStudioLayout from '../../../components/Studio/NewStudioLayout'
import {
  SubNav,
  NavSection,
  NavSectionHeading,
} from '../../../components/Studio/NewStudioNav'
import Dancer from '../../../components/Studio/Dancer'
import PlusSvg from '../../../components/PlusSvg'

import { useQuery } from '@apollo/react-hooks'

import { STUDIO_ALL_DANCERS_QUERY } from '../../../components/Studio/Queries'
import { STUDIO_DANCER } from '../../../components/Studio/Queries'

import Breadcrumb from '../../../components/Studio/Breadcrumb'

function DancerPage() {
  const router = useRouter()
  const { dancerId } = router.query
  const { data, error: allDancersError, loading: allDancersLoading } = useQuery(
    STUDIO_ALL_DANCERS_QUERY
  )

  const { data: dancerQuery, error, loading } = useQuery(STUDIO_DANCER, {
    variables: { id: dancerId },
  })

  const dancer = dancerQuery?.studioDancer

  return (
    <NewStudioLayout
      page={'Dancers'}
      selection={dancer ? `${dancer?.firstName} ${dancer?.lastName}` : ''}
    >
      <div className='hide-ltMedium'>
        <SubNav>
          <NavSection>
            <NavSectionHeading>
              <h2>Dancers</h2>
              <Link href={`/studio/dancers/createDancer`}>
                <a>
                  <PlusSvg />
                </a>
              </Link>
            </NavSectionHeading>
            <ul>
              {data?.studioDancers.map((dancer) => (
                <Link key={dancer.id} href={`/studio/dancers/${dancer.id}`}>
                  <a>
                    {dancer.firstName} {dancer.lastName}
                  </a>
                </Link>
              ))}
            </ul>
          </NavSection>
        </SubNav>
      </div>
      <div className='selectionWindow '>
        <div className='hide-gtMedium'></div>
        <Dancer dancer={dancer} />
      </div>
    </NewStudioLayout>
  )
}

export default DancerPage
