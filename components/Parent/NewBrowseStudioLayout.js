import { useState } from 'react'
import NewParentHeader from '../Parent/NewParentHeader'
import NewParentNav from './NewParentNav'
import ParentBreadcrumb from './ParentBreadcrumb'
import FilterSvg from '../Icons/FilterSvg'
import { NewNavSidebarContainer, NavSection } from '../styles/NewNavStyles'
import BrowseClassFilter from './BrowseClassFilter'
import MobileBrowseClassFilter from './MobileBrowseClassFilter'
import { MobileFilterContainerStyles } from '../styles/MobileFilterContainerStyles'
import {
  SelectionWindowStyles,
  SelectionWindowHeaderStyles,
  SelectionWindowMainStyles,
} from '../styles/SelectionWindowStyles'
import { LayoutStyles, BodyLayoutStyles } from '../styles/PageLayoutStyles'

export default function NewBrowseStudioLayout({
  children,
  page,
  selection = false,
  studio,
}) {
  const [showFilter, toggleFilter] = useState(false)
  const [classFilter, setFilter] = useState({})

  return (
    <>
      <NewParentHeader />
      <BodyLayoutStyles>
        <div className='hide-ltLarge'>
          <NewParentNav />
        </div>
        <div className='hide-ltMedium'>
          <NewNavSidebarContainer>
            <NavSection>
              <BrowseClassFilter studio={studio} />
            </NavSection>
          </NewNavSidebarContainer>
        </div>
        <MobileFilterContainerStyles showFilter={showFilter}>
          <MobileBrowseClassFilter
            studio={studio}
            toggleFilter={toggleFilter}
          />
        </MobileFilterContainerStyles>
        <SelectionWindowStyles>
          <SelectionWindowHeaderStyles>
            <ParentBreadcrumb page={page} selection={selection} />
            <button
              className='hide-gtMedium btn-icon'
              onClick={() => toggleFilter(!showFilter)}
            >
              <FilterSvg w='20' h='20' />
            </button>
          </SelectionWindowHeaderStyles>
          <SelectionWindowMainStyles>{children}</SelectionWindowMainStyles>
        </SelectionWindowStyles>
      </BodyLayoutStyles>
    </>
  )
}
