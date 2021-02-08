import {
  NavSection,
  NewNavSidebarContainer,
  NavSectionHeading,
} from '../styles/NewNavStyles'

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
          {/* <li>
            <a className='btn-nav' href='/parent/hairstyles/createHairstyle'>
              Add a Hairstyle
            </a>
          </li>
          <li>
            <a className='btn-nav' href='/parent/makeup/createMakeup'>
              Add a Makeup Set
            </a>
          </li> */}
          <li>
            <a className='btn-nav' href='/parent/dancers/addDancer'>
              Add a Dancer
            </a>
          </li>
        </ul>
      </NavSection>
    </NewNavSidebarContainer>
  )
}
