import { useQuery } from '@apollo/react-hooks'
import Link from 'next/link'

import NewStudioLayout from '../../../components/Studio/NewStudioLayout'
import DanceClasses from '../../../components/Studio/DanceClasses'
import NewClassFilter from '../../../components/Studio/NewClassFilter'
import Error from '../../../components/Error'
import Loading from '../../../components/Loading'
import { ALL_DANCE_CLASSES_QUERY } from '../../../components/Studio/Queries'
import { useDisplayControls } from '../../../components/Parent/ParentDisplayProvider'
import {
  NavSection,
  NavSectionHeading,
  SubNav,
} from '../../../components/Studio/NewStudioNav'
import PlusSvg from '../../../components/PlusSvg'
import Breadcrumb from '../../../components/Studio/Breadcrumb'

export default function classesIndex() {
  //   const { showControlPanel, toggleControlPanel } = useDisplayControls()

  const { data, error, loading } = useQuery(ALL_DANCE_CLASSES_QUERY)

  return (
    <NewStudioLayout page={'Classes'} createLink={'createClass'}>
      <SubNav>
        <NavSection>
          <div className='hide-ltMedium'>
            <NavSectionHeading>
              <h2>Dance Classes</h2>
              <Link href={`studio/classes/createClass`}>
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
        <Breadcrumb page={'Classes'} />
        {loading && <Loading />}
        {error && <Error error={error} />}
        {data && (
          <DanceClasses allStudioDanceClasses={data.allStudioDanceClasses} />
        )}
      </div>
    </NewStudioLayout>
  )
}
