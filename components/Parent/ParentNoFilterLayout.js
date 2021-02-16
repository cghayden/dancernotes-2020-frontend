import styled from 'styled-components'
import NewParentHeader from '../Parent/NewParentHeader'
import NewParentNav from './NewParentNav'
import ParentBreadcrumb from './ParentBreadcrumb'
import {
  SelectionWindowStyles,
  SelectionWindowHeaderStyles,
  SelectionWindowMainStyles,
} from '../styles/SelectionWindowStyles'
import { LayoutStyles, BodyLayoutStyles } from '../styles/PageLayoutStyles'

export default function ParentNoFilterLayout({
  children,
  page,
  selection = false,
}) {
  return (
    <LayoutStyles>
      <NewParentHeader />
      <BodyLayoutStyles>
        <div className='hide-ltLarge'>
          <NewParentNav />
        </div>
        <SelectionWindowStyles>
          <SelectionWindowHeaderStyles>
            <ParentBreadcrumb page={page} selection={selection} />
          </SelectionWindowHeaderStyles>
          <SelectionWindowMainStyles>{children}</SelectionWindowMainStyles>
        </SelectionWindowStyles>
      </BodyLayoutStyles>
    </LayoutStyles>
  )
}
