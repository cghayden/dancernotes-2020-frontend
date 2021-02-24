import {
  NavSection,
  NewNavSidebarContainer,
  NavSectionHeading,
} from '../styles/NewNavStyles'

export default function StaticParentQuickMenu({ dancers }) {
  return (
    <NewNavSidebarContainer>
      <NavSection>
        <NavSectionHeading>
          <h2>Actions</h2>
        </NavSectionHeading>
        <ul>
          {dancers.length > 0 && (
            <>
              <li>
                <a
                  style={{ whiteSpace: 'nowrap' }}
                  className='btn-nav'
                  href='/parent/routines/createRoutine'
                >
                  Create a Routine
                </a>
              </li>
              <li>
                <a className='btn-nav' href='/parent/events/createEvent'>
                  Add an Event
                </a>
              </li>
            </>
          )}
          <li>
            <a className='btn-nav' href='/parent/dancers/addDancer'>
              Add a Dancer
            </a>
          </li>
          <li>
            <a className='btn-nav' href='/parent/studios/search'>
              Find a Studio
            </a>
          </li>
        </ul>
      </NavSection>
    </NewNavSidebarContainer>
  )
}
