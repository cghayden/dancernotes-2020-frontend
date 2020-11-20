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

import { ALL_DANCE_CLASSES_QUERY } from '../../../components/Studio/Queries'
import { SINGLE_DANCE_QUERY } from '../../../components/Studio/Queries'
import StudioDanceCard from '../../../components/Studio/StudioDanceCard'

function DanceClassPage() {
  const router = useRouter()
  const { danceClassId } = router.query

  const { data, error: allDancersError, loading: allDancersLoading } = useQuery(
    ALL_DANCE_CLASSES_QUERY
  )

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
      selection={danceClass ? `${danceClass.name}` : ''}
    >
      <div className='hide-ltMedium'>
        <SubNav>
          <NavSection>
            <NavSectionHeading>
              <h2>Dance Classes</h2>
              <Link href={`/studio/classes/createClass`}>
                <a>
                  <PlusSvg />
                </a>
              </Link>
            </NavSectionHeading>
            <ul>
              {data?.allStudioDanceClasses.map((danceClass) => (
                <Link
                  key={danceClass.id}
                  href={`/studio/classes/${danceClass.id}`}
                >
                  <a>{danceClass.name}</a>
                </Link>
              ))}
            </ul>
          </NavSection>
        </SubNav>
      </div>
      <div className='selectionWindow '>
        {danceClass && <StudioDanceCard dance={danceClass} />}
      </div>
    </NewStudioLayout>
  )
}

export default DanceClassPage
