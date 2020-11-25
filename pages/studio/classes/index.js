import { useQuery } from '@apollo/react-hooks'
import Link from 'next/link'

import NewStudioLayout from '../../../components/Studio/NewStudioLayout'
import {
  NavSection,
  NavSectionHeading,
  SubNav,
} from '../../../components/Studio/NewStudioNav'
import NewClassFilter from '../../../components/Studio/NewClassFilter'
import Breadcrumb from '../../../components/Studio/Breadcrumb'
import PlusSvg from '../../../components/Icons/PlusSvg'

import DanceClasses from '../../../components/Studio/DanceClasses'
import { ALL_DANCE_CLASSES_QUERY } from '../../../components/Studio/Queries'
import { useDisplayControls } from '../../../components/Parent/ParentDisplayProvider'

export default function classesIndex() {
  //   const { showControlPanel, toggleControlPanel } = useDisplayControls()
  const { data, error, loading } = useQuery(ALL_DANCE_CLASSES_QUERY)

  return (
    <NewStudioLayout
      page={'Classes'}
      createLink={`/studio/dancers/createDancer`}
      error={error}
      loading={loading}
    >
      <div className='selectionWindow'>
        <Breadcrumb page={'Classes'} />

        {data && (
          <DanceClasses allStudioDanceClasses={data.allStudioDanceClasses} />
        )}
      </div>
    </NewStudioLayout>
  )
}
