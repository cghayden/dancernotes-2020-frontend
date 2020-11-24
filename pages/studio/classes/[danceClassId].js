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
import PlusSvg from '../../../components/PlusSvg'
import { ALL_DANCE_CLASSES_QUERY } from '../../../components/Studio/Queries'
import { SINGLE_DANCE_QUERY } from '../../../components/Studio/Queries'
import StudioDanceCard from '../../../components/Studio/StudioDanceCard'
import Breadcrumb from '../../../components/Studio/Breadcrumb'

function DanceClassPage() {
  const router = useRouter()
  const { danceClassId } = router.query
  const {
    data: allClasses,
    error: ErrorAllDances,
    loading: loadingAllDances,
  } = useQuery(ALL_DANCE_CLASSES_QUERY)
  const danceClasses = allClasses ? allClasses.allStudioDanceClasses : []

  const { data: danceClassQuery, error, loading } = useQuery(
    SINGLE_DANCE_QUERY,
    {
      variables: { id: danceClassId },
    }
  )

  const danceClass = danceClassQuery?.danceClass

  return (
    <NewStudioLayout>
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
              // open={showControlPanel}
              // closeControls={toggleControlPanel}
              />
            </div>
          </NavSection>
        </SubNav>
      </div>
      <div className='selectionWindow '>
        {danceClass && (
          <>
            <Breadcrumb
              page={'Classes'}
              selection={danceClass ? `${danceClass.name}` : ''}
            />
            <StudioDanceCard dance={danceClass} />
          </>
        )}
      </div>
    </NewStudioLayout>
  )
}

export default DanceClassPage
