import { useQuery } from '@apollo/react-hooks'
import Link from 'next/link'

import NewClassFilter from '../../../components/Studio/NewClassFilter'
import Breadcrumb from '../../../components/Studio/Breadcrumb'

import NewStudioLayout from '../../../components/Studio/NewStudioLayout'
import {
  SubNav,
  NavSection,
  NavSectionHeading,
} from '../../../components/Studio/NewStudioNav'
import AllDancerCards from '../../../components/Studio/AllDancerCards'
import { STUDIO_ALL_DANCERS_QUERY } from '../../../components/Studio/Queries'
import PlusSvg from '../../../components/PlusSvg'
import Error from '../../../components/Error'
import Loading from '../../../components/Loading'

export default function dancersIndex() {
  const { data, error, loading } = useQuery(STUDIO_ALL_DANCERS_QUERY)

  return (
    <NewStudioLayout page={'Dancers'} createLink={'createDancer'}>
      <SubNav>
        <NavSection>
          <div className='hide-ltMedium'>
            <NavSectionHeading>
              <h2>Dancers</h2>
              <Link href={`/studio/dancers/createDancer`}>
                <a>
                  <PlusSvg />
                </a>
              </Link>
            </NavSectionHeading>
          </div>
          <div className='hide-ltMedium'>
            <NewClassFilter
            // open={showControlPanel}
            // closeControls={toggleControlPanel}
            />
          </div>
        </NavSection>
      </SubNav>
      <div className='selectionWindow hide-ltMedium'>
        <Breadcrumb page={'Dancers'} />
        {loading && <Loading />}
        {error && <Error error={error} />}
        {data && <AllDancerCards dancers={data.studioDancers} />}
      </div>
    </NewStudioLayout>
  )
}
