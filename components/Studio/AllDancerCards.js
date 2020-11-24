import { useContext } from 'react'
import { FilterContext } from './FilterContext'

import Link from 'next/link'
import { SubNav, NavSection, NavSectionHeading } from './NewStudioNav'

import { ALL_DANCE_CLASSES_QUERY } from './Queries'
import { useQuery } from '@apollo/react-hooks'
import StudioDanceCard from './StudioDanceCard'
import Error from '../Error'
import Loading from '../Loading'
import styled from 'styled-components'

const Dancers = ({ classFilter, dancers }) => {
  //   function compareDancerToFilter(dancer, filter) {
  //     let pass = true
  //     const filterCategories = Object.keys(filter)
  //     filterCategories.forEach((category) => {
  //       if (!filter[category].includes(dancer[category])) {
  //         pass = false
  //       }
  //     })
  //     return pass
  //   }

  const filteredDancers = dancers.filter(
    (dancer) => {
      console.log('run dancer through filter to see if they meet the criteria')
      return dancer.firstName.length > 1
    }
    // compareDancerToFilter(danceClass, classFilter)
  )
  // const activeFilters = [].concat.apply([], Object.values(classFilter));

  return (
    <SubNav>
      <NavSection>
        <ul>
          {filteredDancers.map((dancer) => (
            <li key={dancer.id}>
              <Link href={`/studio/dancers/${dancer.id}`}>
                <a>
                  {dancer.firstName} {dancer.lastName}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </NavSection>
    </SubNav>
  )
}
export default Dancers
{
  /* <div className='hide-gtMedium'>
          </div> */
}
