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
import PlusSvg from '../../../components/PlusSvg'

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
  console.log('dancer', dancer)

  return (
    <NewStudioLayout>
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

            <div className='hide-gtMedium'>
              <ul>
                {data?.studioDancers.map((dancer) => (
                  <Link key={dancer.id} href={`/studio/dancers/${dancer.id}`}>
                    <a>
                      {dancer.firstName} {dancer.lastName}
                    </a>
                  </Link>
                ))}
              </ul>
            </div>
            <div className='hide-ltMedium'>
              <NewClassFilter
              // open={showControlPanel}
              // closeControls={toggleControlPanel}
              />
            </div>
          </NavSection>
        </SubNav>
      </div>
      <div className='selectionWindow '>
        {dancer && (
          <>
            <Breadcrumb
              page={'Dancers'}
              selection={dancer ? `${dancer.firstName} ${dancer.lastName}` : ''}
            />
            <Dancer dancer={dancer} />
          </>
        )}
      </div>
    </NewStudioLayout>
  )
}

export default DancerPage
