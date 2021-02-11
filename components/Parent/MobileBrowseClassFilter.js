import { useContext } from 'react'
import styled from 'styled-components'
import StaticClassCategoryFilter from '../StaticClassCategoryFilter'
import { FilterContext } from '../Studio/FilterContext'
import LockedSvg from '../Icons/LockedSvg'
import XSvg from '../Icons/XSvg'
import TrashIcon from '../Icons/TrashIcon'

const FilterPanelStyles = styled.div`
  display: grid;
  grid-template-columns: minmax(120px, 250px) minmax(120px, 250px);
  grid-gap: 0.5rem;

  h2 {
    flex-grow: 1;
  }
  a,
  button {
    border-radius: 0;
    margin: 0 0.5rem;
    padding: 10px 0.5rem 0.5rem 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;

    &:hover {
      color: hsl(200, 95%, 95%);
      background: ${(props) => props.theme.indigo5};
    }
  }

  ul {
    font-size: 1rem;
    align-items: start;
    @media (max-width: ${(props) => props.theme.largeScreen}) {
      font-size: 0.8rem;
    }
  }
`

const FilterHeaderStyles = styled.div`
  grid-column: 1/-1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ActiveFilters = styled.div`
  grid-column: 1/-1;
  display: grid;
  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0.25rem 0;

    li {
      padding: 0.25rem 0.5rem;
      margin: 0.25rem 0.5rem;
      background: ${(props) => props.theme.indigo7};
      color: ${(props) => props.theme.gray0};
      border-radius: 5px;
    }
  }
  @media (min-width: ${(props) => props.theme.largeScreen}) {
    display: none;
  }
`

const MobileFilter = ({ toggleFilter, studio }) => {
  const { filter, setFilter } = useContext(FilterContext)
  const filterOptions = ['competitiveLevel', 'ageDivision', 'style', 'day']
  const days = ['Mon.', 'Tue.', 'Wed.', 'Thur.', 'Fri', 'Sat.', 'Sun.']

  return (
    <FilterPanelStyles>
      <FilterHeaderStyles>
        <h2>Filter By:</h2>
        <button
          title='Unlock Filter'
          onClick={() => console.log('toggle filter lock')}
        >
          <LockedSvg w={'16'} h={'16'} />
        </button>
        <button
          title='Clear all filters'
          onClick={() => setFilter({})}
          title='Clear Filter'
        >
          <TrashIcon w={'16'} h={'16'} />
        </button>
        <button onClick={() => toggleFilter(false)}>
          <XSvg w={'16'} h={'16'} />
        </button>
      </FilterHeaderStyles>
      {filterOptions.map((filterCategory) => {
        const pluralCategory = filterCategory.concat('s')
        return (
          <StaticClassCategoryFilter
            key={filterCategory}
            setFilter={setFilter}
            classFilter={filter}
            category={filterCategory}
            selections={
              filterCategory === 'day' ? days : studio[pluralCategory]
            }
          />
        )
      })}
    </FilterPanelStyles>
  )
}

export default MobileFilter
export { ActiveFilters }

{
  /* <h2>Filter By:</h2> */
}
{
  /* <FilterPanelHeader>
        <CloseFilterPanel onClick={closeControls}>Close</CloseFilterPanel>
      </FilterPanelHeader> */
}
{
  /* show clear button if there are active filters*/
}
{
  /* {Object.keys(classFilter).length > 0 && (
          <button onClick={clearFilter}>Clear All</button>
        )} */
}
{
  /* <ActiveFilters>
        {/*display a list of the active filters */
}
{
  /* {Object.keys(classFilter).length > 0 && (
        <ul>
          {activeFilters.map((choice) => (
            <li key={choice}>{choice}</li>
          ))}
        </ul>
      )} */
}
{
  /* </ActiveFilters> */
}
