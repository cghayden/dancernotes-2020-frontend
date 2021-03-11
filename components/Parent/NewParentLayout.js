import { useState } from 'react'
import NewParentHeader from '../Parent/NewParentHeader'
import NewParentNav from './NewParentNav'
import ParentBreadcrumb from './ParentBreadcrumb'
import FilterSvg from '../Icons/FilterSvg'
import ParentMobileControls from './ParentMobileControls'
import ParentSubNavFilter from './ParentSubNavFilter'
import { MobileFilterContainerStyles } from '../styles/MobileFilterContainerStyles'
import {
  SelectionWindowStyles,
  SelectionWindowHeaderStyles,
  SelectionWindowMainStyles,
} from '../styles/SelectionWindowStyles'
import { BodyLayoutStyles } from '../styles/PageLayoutStyles'

export default function NewParentLayout({
  children,
  page,
  selection = false,
  createLink = false,
}) {
  const [showFilter, toggleFilter] = useState(false)

  return (
    <>
      <NewParentHeader />
      <BodyLayoutStyles>
        <div className='hide-ltLarge'>
          <NewParentNav />
        </div>
        <div className='hide-ltMedium'>
          <ParentSubNavFilter page={page} createLink={createLink} />
        </div>
        <MobileFilterContainerStyles showFilter={showFilter}>
          <ParentMobileControls
            page={page}
            createLink={createLink}
            toggleFilter={toggleFilter}
          />
        </MobileFilterContainerStyles>
        <SelectionWindowStyles>
          <SelectionWindowHeaderStyles>
            <ParentBreadcrumb page={page} selection={selection} />
            <button
              type='button'
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
