import { useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'

import { ALL_Rs } from './Queries'
import DanceCard from './DanceCard'
import Error from '../Error'
import { useDisplayControls } from '../../components/Parent/ParentDisplayProvider'
import SearchForStudio from './SearchForStudio'
import Card from '../../components/styles/Card'
//query all dances where ids of parents dancers are in the ids of enrolled dancers for the dance.  On the server, filter out all dancers not belonging to this parent.

function RoutinesDisplay({ dancerIds }) {
  const [showStudioSearch, setShowStudioSearch] = useState(false)
  const { hiddenIds, competitionMode } = useDisplayControls()

  const { data, error, loading } = useQuery(ALL_Rs)

  // function formatSortValue(day, startTime) {
  //   const dayValues = {
  //     "Mon.": 1,
  //     "Tue.": 2,
  //     "Wed.": 3,
  //     "Thur.": 4,
  //     "Fri.": 5,
  //     "Sat.": 6,
  //     "Sun.": 7,
  //   }
  //   const timeValue = dayValues[day] + startTime
  //   timeValue.replace(":", "")
  //   return timeValue
  // }

  // function sortByName(a, b) {
  //   const nameA = a.name.toUpperCase()
  //   const nameB = b.name.toUpperCase()
  //   if (nameA < nameB) {
  //     return -1
  //   }
  //   if (nameA > nameB) {
  //     return 1
  //   }
  // }

  if (error) return <Error error={error} />
  if (loading) return <p>5, 6, 7, 8 ...</p>

  const allRs = data ? data.allRs : []
  if (!allRs.length) {
    return (
      <Card>
        <div className='card__section'>
          <p>
            Competition Routines and other dance classes your dancers are in
            will appear here.
          </p>
          <p>You can filter the view with the display option above.</p>
          <p>You currently have no routines to display.</p>
          <p>You can:</p>
        </div>
        <p>
          Search for a studio to request notes, signup for classes, or browse
          the studio's class offerings...
        </p>
        <button
          className='btn-action-primary'
          onClick={() => setShowStudioSearch(!showStudioSearch)}
        >
          Search for a Studio
        </button>
        {showStudioSearch && <SearchForStudio dancerId={dancerIds[0]} />}
        <p>- OR -</p>
        <Link href='/parent/createCustomRoutine'>
          <a className='btn-action-primary'>Create your own Routine</a>
        </Link>
      </Card>
    )
  }

  for (const dance of allRs) {
    // dance.sortValue = formatSortValue(dance.day, dance.startTime);
    const dancerIds = []
    for (const dancer of dance.dancers) {
      dancerIds.push(dancer.id)
    }
    dance.dancerIds = dancerIds
  }

  const visibleDancersIds = dancerIds.filter((id) => !hiddenIds.includes(id))

  if (!competitionMode)
    return (
      <>
        {allRs
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
                  <DanceCard
                    visibleDancersIds={visibleDancersIds}
                    key={dance.id}
                    dance={dance}
                  />
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
                <DanceCard
                  visibleDancersIds={visibleDancersIds}
                  key={dance.id}
                  dance={dance}
                />
              )
            }
          })}
      </>
    )

  if (competitionMode) {
    const compRoutines = allRs.filter((routine) => routine.entryNumber)
    return (
      <>
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
                  <DanceCard
                    visibleDancersIds={visibleDancersIds}
                    key={dance.id}
                    dance={dance}
                  />
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
                <DanceCard
                  visibleDancersIds={visibleDancersIds}
                  key={dance.id}
                  dance={dance}
                />
              )
            }
          })}
      </>
    )
  }
}

export default RoutinesDisplay
