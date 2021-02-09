import { useContext } from 'react'
import styled from 'styled-components'
import CategoryFilter from './CategoryFilter'

import { FilterContext } from '../Studio/FilterContext'
import LockedSvg from '../Icons/LockedSvg'
import TrashIcon from '../Icons/TrashIcon'

const FilterPanelStyles = styled.div`
  a,
  button {
    border-radius: 0;
    margin: 0;
    padding: 10px 0.5rem 0.5rem 0.5rem;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  h3 {
    flex-grow: 1;
  }
`
const Categories = styled.div`
  padding: 0;
  display: grid;
  grid-row-gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(100px, 150px));
  justify-content: center;
  @media (min-width: ${(props) => props.theme.largeScreen}) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 200px));
  }
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

const CheckboxArea = styled.div`
  padding: 1rem 0;
  display: grid;
  grid-row-gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(100px, 150px));
  justify-content: center;
  @media (min-width: ${(props) => props.theme.largeScreen}) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 200px));
  }
`

const CheckboxAreaHeader = styled.div`
  grid-column: 1/-1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
  h3 {
    font-size: 1.25rem;
  }
  button {
    background-color: ${(props) => props.theme.red5};
    color: ${(props) => props.theme.red0};
    margin: 0;
  }
`

const BrowseClassFilter = ({ studio }) => {
  const { filter, setFilter } = useContext(FilterContext)

  const filterOptions = ['style', 'competitiveLevel', 'ageDivision', 'day']
  const days = ['Mon.', 'Tue.', 'Wed.', 'Thur.', 'Fri', 'Sat.', 'Sun.']

  const activeFilters = [].concat.apply([], Object.values(filter))

  return (
    <FilterPanelStyles>
      <FilterHeaderStyles>
        <h3>Filter By:</h3>
        <button
          title='lock Filter'
          className='btn-icon'
          onClick={() => console.log('toggle filter lock')}
        >
          <LockedSvg w={'18'} h={'18'} />
          <span className='sr-only'>
            Lock Filter to keep this filter across page changes
          </span>
        </button>
        <button
          className='btn-icon'
          title='Clear all filters'
          onClick={() => setFilter({})}
          title='Clear Filter'
        >
          <TrashIcon w={'18'} h={'18'} />
          <span className='sr-only'>Clear all Filters</span>
        </button>
      </FilterHeaderStyles>
      <Categories>
        {filterOptions.map((filterCategory) => {
          const pluralCategory = filterCategory.concat('s')
          return (
            <CategoryFilter
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
      </Categories>
    </FilterPanelStyles>
  )
}

export default BrowseClassFilter
export { ActiveFilters }
