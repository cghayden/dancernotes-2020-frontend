import {
  NavSection,
  NewNavSidebarContainer,
  SubNav,
  NavSectionHeading,
} from './NewParentNav'

export default function StaticParentQuickMenu() {
  return (
    <NewNavSidebarContainer>
      <NavSection>
        <NavSectionHeading>
          <h2>Actions</h2>
        </NavSectionHeading>
        <ul>
          <li>
            <a className='btn-nav' href='/parent/routines/createRoutine'>
              Create a Routine
            </a>
          </li>
          <li>
            <a className='btn-nav' href='/parent/events/createEvent'>
              Add an Event
            </a>
          </li>
          <li>
            <a className='btn-nav' href='/parent/createHairstyle'>
              Add a Hairstyle
            </a>
          </li>
          <li>
            <a className='btn-nav' href='/parent/createMakeup'>
              Add a Makeup Set
            </a>
          </li>
          <li>
            <a className='btn-nav' href='/parent/createDancer'>
              Add a Dancer
            </a>
          </li>
        </ul>
      </NavSection>
    </NewNavSidebarContainer>
  )
}
