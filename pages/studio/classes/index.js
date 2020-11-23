import { useContext, useState } from 'react'
import NewStudioLayout from '../../../components/Studio/NewStudioLayout'
import DanceClasses from '../../../components/Studio/DanceClasses'
import NewClassFilter from '../../../components/Studio/NewClassFilter'
import { ALL_DANCE_CLASSES_QUERY } from '../../../components/Studio/Queries'
import { useDisplayControls } from '../../../components/Parent/ParentDisplayProvider'
import DancesActiveFilterHeading from '.././DancesActiveFilterHeading'
import {
  NavSection,
  NavSectionHeading,
  SubNav,
} from '../../../components/Studio/NewStudioNav'
import PlusSvg from '../../../components/PlusSvg'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'
import Breadcrumb from '../../../components/Studio/Breadcrumb'
import { FilterContext } from '../../../components/Studio/FilterContext'

// --------------- Styles ------------------------------

// ~~~~~~~~~~~~~~~~~~~ CODE ~~~~~~~~~~~~~~~~~~~~~~

export default function classesIndex() {
  //   const [choice, setChoice] = useState('all')
  //   const [createNew, setCreateNew] = useState(false)
  //   const { showControlPanel, toggleControlPanel } = useDisplayControls()
  const { filter, setFilter } = useContext(FilterContext)

  const { data, error, loading } = useQuery(ALL_DANCE_CLASSES_QUERY)

  const danceClasses = data ? data.allStudioDanceClasses : []

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
          <div className='hide-gtMedium'>
            <ul>
              {danceClasses.map((danceClass) => (
                <li key={danceClass.id}>
                  <Link
                    key={danceClass.id}
                    href={`/studio/classes/${danceClass.id}`}
                  >
                    <a>{danceClass.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='hide-ltMedium'>
            <NewClassFilter
              classFilter={filter}
              setFilter={setFilter}
              // open={showControlPanel}
              // closeControls={toggleControlPanel}
            />
          </div>
        </NavSection>
      </SubNav>
      <div className='selectionWindow hide-ltMedium'>
        {/* <div>Dance classes dashboard</div> */}
        <DancesActiveFilterHeading classFilter={filter} setFilter={setFilter} />
        <DanceClasses
          classFilter={filter}
          // toggleControls={toggleControlPanel}
        />
      </div>
    </NewStudioLayout>
  )
}
