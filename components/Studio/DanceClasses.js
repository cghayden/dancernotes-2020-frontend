import { useContext } from 'react'
import { FilterContext } from './FilterContext'

import Link from 'next/link'
import { SubNav, NavSection, NavSectionHeading } from './NewStudioNav'

const DanceClasses = ({ allStudioDanceClasses }) => {
  const { filter } = useContext(FilterContext)

  function compareDanceToFilter(danceClass, filter) {
    let pass = true
    const filterCategories = Object.keys(filter)
    filterCategories.forEach((category) => {
      if (!filter[category].includes(danceClass[category])) {
        pass = false
      }
    })
    return pass
  }

  const filteredClasses = allStudioDanceClasses.filter((danceClass) =>
    compareDanceToFilter(danceClass, filter)
  )
  // const activeFilters = [].concat.apply([], Object.values(classFilter));

  return (
    <SubNav>
      <NavSection>
        <ul>
          {filteredClasses.map((danceClass) => (
            <li key={danceClass.id}>
              <Link href={`/studio/classes/${danceClass.id}`}>
                <a>{danceClass.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </NavSection>
    </SubNav>
  )
}
export default DanceClasses
