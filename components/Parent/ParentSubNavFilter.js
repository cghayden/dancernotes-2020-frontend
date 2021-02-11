import { NewNavSidebarContainer, NavSection } from '../styles/NewNavStyles'
import NewParentControlPanel from './NewParentControlPanel'

function SubNavFilter() {
  return (
    <NewNavSidebarContainer>
      <NavSection>
        <NewParentControlPanel />
      </NavSection>
    </NewNavSidebarContainer>
  )
}

export default SubNavFilter
