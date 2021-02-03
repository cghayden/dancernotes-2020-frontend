import styled from 'styled-components'
import {
  NavSection,
  NewNavSidebarContainer,
  SubNav,
  NavSectionHeading,
} from '../Parent/NewParentNav'

export default function StaticParentQuickMenu() {
  return (
    <NewNavSidebarContainer>
      <NavSection>
        <NavSectionHeading>
          <h2>Actions</h2>
        </NavSectionHeading>
        <ul>
          <li>
            <a href='/studio/classes/createClass'>Add a Dance Class</a>
          </li>
          <li>
            <a href='/studio/events/createEvent'>Add an Event</a>
          </li>
          <li>
            <a href='/studio/hairstyles/createHairStyle'>Add a Hairstyle</a>
          </li>
          <li>
            <a href='/studio/makeup/createMakeupSet'>Add a Makeup Set</a>
          </li>
          <li>
            <a href='/studio/dancers/#createDancer'>Add a Dancer</a>
          </li>
        </ul>
      </NavSection>
    </NewNavSidebarContainer>
  )
}
