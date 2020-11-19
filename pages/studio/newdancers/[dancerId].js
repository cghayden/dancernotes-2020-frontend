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

function DancerPage() {
  const { data, error, loading } = useQuery(STUDIO_ALL_DANCERS_QUERY)
  const router = useRouter()
  const { dancerId } = router.query
  return (
    <NewStudioLayout>
      <div className='hide-ltMedium'>
        <SubNav>
          <NavSection>
            <NavSectionHeading>
              <h2>Dancers</h2>
              <Link href={`/studio/newdancers/#createDancer`}>
                <a>
                  <PlusSvg />
                </a>
              </Link>
            </NavSectionHeading>
            <ul>
              {data?.studioDancers.map((dancer) => (
                <Link key={dancer.id} href={`/studio/newdancers/${dancer.id}`}>
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
        {/* <h2>Dancer></h2> */}
        <Dancer id={dancerId} />
      </div>
    </NewStudioLayout>
  )
}

export default DancerPage
