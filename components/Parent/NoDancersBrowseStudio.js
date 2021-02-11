import { useContext } from 'react'
import styled from 'styled-components'
import Card from '../../components/styles/Card'
import { ActiveFilters } from './BrowseClassFilter'
import DanceClassListingOnly from './DanceClassListingOnly'
import { FilterContext } from '../Studio/FilterContext'

const ClassListCard = styled(Card)`
  background: ${(props) => props.theme.gray0};
  width: 97%;
  max-width: 900px;
  box-shadow: none;
  margin-top: -2px;
  h2 {
    margin-bottom: 1rem;
  }
`

const LargeScreenActiveFilters = styled(ActiveFilters)`
  h2 {
    font-size: 1rem;
  }
  margin-bottom: 0.5rem;
  @media (min-width: ${(props) => props.theme.largeScreen}) {
    h2 {
      font-size: 1.25rem;
    }
    display: block;
  }
`
const FiltersDisplay = styled.div`
  text-align: left;
  display: flex;
  align-items: center;
`
function NoDancersBrowseStudio({ studio }) {
  const { filter: classFilter } = useContext(FilterContext)

  function compareDanceToFilter(danceClass, classFilter) {
    let pass = true
    const filterCategories = Object.keys(classFilter)
    filterCategories.forEach((category) => {
      if (!classFilter[category].includes(danceClass[category])) {
        pass = false
      }
    })
    return pass
  }

  const filteredClasses = studio.danceClasses
    ? studio.danceClasses.filter((danceClass) =>
        compareDanceToFilter(danceClass, classFilter)
      )
    : []
  const activeFilters = [].concat.apply([], Object.values(classFilter))
  return (
    <ClassListCard>
      <h2>Available dance classes at {studio.studioName}</h2>
      {/*display a list of the active filters */}
      <LargeScreenActiveFilters>
        {Object.keys(classFilter).length > 0 && (
          <FiltersDisplay>
            <h2>Active Filters:</h2>
            <ul>
              {activeFilters.map((choice) => (
                <li key={choice}>{choice}</li>
              ))}
            </ul>
          </FiltersDisplay>
        )}
      </LargeScreenActiveFilters>

      {filteredClasses.map((dance) => {
        if (dance.size === 'Group') {
          return <DanceClassListingOnly dance={dance} key={dance.id} />
        }
      })}
    </ClassListCard>
  )
}

export default NoDancersBrowseStudio
