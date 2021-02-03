import { useContext } from 'react'
import styled from 'styled-components'

import { FilterContext } from './FilterContext'
import {
  NewNavSidebarContainer,
  NavSection,
  NavSectionHeading,
} from '../styles/NewNavStyles'

const ActiveFilterSubNavList = styled.ul`
  li {
    margin: 0.5rem 0;
    color: ${(props) => props.theme.green8};
  }
`

function ActiveFilterChoices() {
  const { filter } = useContext(FilterContext)
  const activeFilterChoices = Object.values(filter).flat()

  return (
    <NewNavSidebarContainer>
      <NavSection>
        <NavSectionHeading>
          <h2>Active Filters:</h2>
        </NavSectionHeading>
        <ActiveFilterSubNavList>
          {activeFilterChoices.map((choice, i) => (
            <li key={i}>{choice}</li>
          ))}
        </ActiveFilterSubNavList>
      </NavSection>
    </NewNavSidebarContainer>
  )
}

export default ActiveFilterChoices
