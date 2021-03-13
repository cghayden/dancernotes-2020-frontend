import { useState } from 'react'
import Error from '../../components/Error'
import Loading from '../../components/Loading'
import NewStudioHeader from './NewStudioHeader'
import NewStudioNav from './NewStudioNav'
import SubNavFilter from './SubNavFilter'
import Breadcrumb from './StudioBreadcrumb'
import ActiveFilterChoices from './ActiveFilterChoices'
import FilterSvg from '../Icons/FilterSvg'
import MobileFilter from './MobileFilter'
import { BodyLayoutStyles, LayoutStyles } from '../styles/PageLayoutStyles'
import { MobileFilterContainerStyles } from '../styles/MobileFilterContainerStyles'
import {
  SelectionWindowStyles,
  SelectionWindowHeaderStyles,
  SelectionWindowMainStyles,
} from '../styles/SelectionWindowStyles'
export default function NewStudioLayout({
  children,
  page,
  selection = false,
  createLink = false,
  loading = false,
  error = false,
}) {
  const [showFilter, toggleFilter] = useState(false)

  return (
    <LayoutStyles>
      <NewStudioHeader />
      <BodyLayoutStyles>
        <div className='hide-ltLarge'>
          <NewStudioNav />
        </div>
        <div className='hide-ltMedium'>
          {selection ? (
            <ActiveFilterChoices />
          ) : (
            <SubNavFilter page={page} createLink={createLink} />
          )}
        </div>
        <MobileFilterContainerStyles showFilter={showFilter}>
          <MobileFilter toggleFilter={toggleFilter} />
        </MobileFilterContainerStyles>
        <SelectionWindowStyles>
          <SelectionWindowHeaderStyles>
            <Breadcrumb page={page} selection={selection} />
            <button
              className='hide-gtMedium btn-icon'
              onClick={() => toggleFilter(!showFilter)}
            >
              <FilterSvg w='20' h='20' />
            </button>
          </SelectionWindowHeaderStyles>
          {loading && <Loading />}
          {error && <Error error={error} />}
          <SelectionWindowMainStyles>{children}</SelectionWindowMainStyles>
        </SelectionWindowStyles>
      </BodyLayoutStyles>
    </LayoutStyles>
  )
}
