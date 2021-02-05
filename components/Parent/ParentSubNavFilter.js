import Link from 'next/link'
import {
  NewNavSidebarContainer,
  NavSection,
  NavSectionHeading,
} from '../styles/NewNavStyles'
import PlusSvg from '../Icons/PlusSvg'
import NewParentControlPanel from './NewParentControlPanel'

function SubNavFilter({ page, createLink }) {
  return (
    <NewNavSidebarContainer>
      <NavSection>
        <NavSectionHeading>
          <h2>{page}</h2>
          {createLink && (
            <Link href={createLink}>
              <a className='btn-icon'>
                <PlusSvg />
                <span className='sr-only'>{`create a new item for ${page}`}</span>
              </a>
            </Link>
          )}
        </NavSectionHeading>
        <NewParentControlPanel />
      </NavSection>
    </NewNavSidebarContainer>
  )
}

export default SubNavFilter
