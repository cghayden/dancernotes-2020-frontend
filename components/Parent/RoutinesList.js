import Link from 'next/link'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'

import { ALL_Rs } from './Queries'
import { useDisplayControls } from '../../components/Parent/ParentDisplayProvider'
import SearchForStudio from './SearchForStudio'
import Card from '../../components/styles/Card'
import DanceListingLink from './DanceListingLink'
import { useToggle } from '../../utilities/useToggle'
import Loading from '../Loading'
import NewSearchForStudio from './NewSearchForStudio'
//query all dances where ids of parents dancers are in the ids of enrolled dancers for the dance.  On the server, filter out all dancers not belonging to this parent.const NoRoutinesDiv = styled.div`

const NoRoutinesCard = styled(Card)``
const CardOptions = styled.div`
  display: grid;
`
function RoutinesList({ dancerIds }) {
  const { hiddenIds, competitionMode } = useDisplayControls()
  const { isToggled, toggle } = useToggle(false)

  const { data, error, loading } = useQuery(ALL_Rs)

  function formatSortValue(day, startTime) {
    const dayValues = {
      'Mon.': 1,
      'Tue.': 2,
      'Wed.': 3,
      'Thur.': 4,
      'Fri.': 5,
      'Sat.': 6,
      'Sun.': 7,
    }
    const timeValue = dayValues[day] + startTime
    timeValue.replace(':', '')
    return timeValue
  }

  function sortByName(a, b) {
    const nameA = a.name.toUpperCase()
    const nameB = b.name.toUpperCase()
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
  }
  if (error) return <Error error={error} />
  if (loading) return <Loading />

  if (!data.allRs.length) {
    return (
      <NoRoutinesCard>
        <div>
          <p>
            Dance Classes and competition routines your dancers are in will
            appear here.
          </p>
          <p>You currently have no routines to display.</p>
          <p>You can:</p>
        </div>

        <CardOptions className='card__section'>
          <button className='btn-action-primary' onClick={toggle}>
            Search for a studio to browse and/or register for classes.
          </button>
          {isToggled && <NewSearchForStudio />}
          {dancerIds.length > 0 && (
            <>
              <p>- OR -</p>
              <Link href='/parent/routines/createRoutine'>
                <a className='btn-action-primary'>Create your own Routine</a>
              </Link>
            </>
          )}
        </CardOptions>
      </NoRoutinesCard>
    )
  }

  const allRoutines = data.allRs.map((routine) => {
    const dancerIds = []
    for (const dancer of routine.dancers) {
      dancerIds.push(dancer.id)
    }
    return { ...routine, dancerIds }
  })

  // for (const dance of data.allRs) {
  //   // dance.sortValue = formatSortValue(dance.day, dance.startTime);
  //   const dancerIds = []
  //   for (const dancer of dance.dancers) {
  //     dancerIds.push(dancer.id)
  //   }
  //   dance.dancerIds = dancerIds
  // }

  const visibleDancersIds = dancerIds.filter((id) => !hiddenIds.includes(id))

  if (!competitionMode)
    return (
      <ul className='optionsList'>
        {allRoutines
          .sort((a, b) => {
            if (a.sortValue <= b.sortValue) {
              return -1
            }
            if (a.sortValue > b.sortValue) {
              return 1
            }
          })
          .map((dance) => {
            //independent dances...
            if (!dance.studio) {
              if (
                hiddenIds.includes('all') ||
                dance.dancerIds.some((dancerId) => hiddenIds.includes(dancerId))
              ) {
                return null
              }
              if (
                !hiddenIds.includes(dance.id) &&
                visibleDancersIds.some((visibleDancerId) =>
                  dance.dancerIds.includes(visibleDancerId)
                )
              ) {
                return (
                  <li key={dance.id}>
                    <Link href={`/parent/routines/${dance.id}`}>
                      <a className='btn-selectionOption'>
                        <DanceListingLink dance={dance} />
                      </a>
                    </Link>
                  </li>
                )
              }
            }
            //all other dances ( linked with a studio & studioId)

            if (
              !hiddenIds.includes(dance.id) &&
              !hiddenIds.includes(dance.studio.id) &&
              visibleDancersIds.some((visibleDancerId) =>
                dance.dancerIds.includes(visibleDancerId)
              )
            ) {
              return (
                <li key={dance.id}>
                  <Link href={`/parent/routines/${dance.id}`}>
                    <a className='btn-selectionOption'>
                      <DanceListingLink dance={dance} />
                    </a>
                    {/* <a className='btn-selectionOption'>{dance.name}</a> */}
                  </Link>
                </li>
              )
            }
          })}
      </ul>
    )

  if (competitionMode) {
    const compRoutines = allRoutines.filter((routine) => routine.entryNumber)
    return (
      <ul>
        {compRoutines
          .sort((a, b) => {
            if (parseInt(a.entryNumber) < parseInt(b.entryNumber)) {
              return -1
            }
            if (parseInt(a.entryNumber) > parseInt(b.entryNumber)) {
              return 1
            }
          })
          .map((dance) => {
            //independent dances...
            if (!dance.studio) {
              if (
                hiddenIds.includes('all') ||
                dance.dancerIds.some((dancerId) => hiddenIds.includes(dancerId))
              ) {
                return null
              }
              if (
                !hiddenIds.includes(dance.id) &&
                visibleDancersIds.some((visibleDancerId) =>
                  dance.dancerIds.includes(visibleDancerId)
                )
              ) {
                return (
                  <li key={dance.id}>
                    <Link href={`/parent/routines/${dance.id}`}>
                      <a className='btn-selectionOption'>{dance.name}</a>
                    </Link>
                  </li>
                )
              }
            }
            //all other dances ( linked with a studio & studioId)

            if (
              !hiddenIds.includes(dance.id) &&
              !hiddenIds.includes(dance.studio.id) &&
              visibleDancersIds.some((visibleDancerId) =>
                dance.dancerIds.includes(visibleDancerId)
              )
            ) {
              return (
                <li key={dance.id}>
                  <Link href={`/parent/routines/${dance.id}`}>
                    <a className='btn-selectionOption'>{dance.name}</a>
                  </Link>
                </li>
              )
            }
          })}
      </ul>
    )
  }
}

export default RoutinesList
