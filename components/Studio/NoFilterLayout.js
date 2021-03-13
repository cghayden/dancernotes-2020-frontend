import styled from 'styled-components'
import Error from '../../components/Error'
import Loading from '../../components/Loading'
import NewStudioHeader from './NewStudioHeader'
import NewStudioNav from './NewStudioNav'
import Breadcrumb from './StudioBreadcrumb'
import {
  SelectionWindowStyles,
  SelectionWindowHeaderStyles,
  SelectionWindowMainStyles,
} from '../styles/SelectionWindowStyles'
import { LayoutStyles, BodyLayoutStyles } from '../styles/PageLayoutStyles'

export default function NoFilterLayout({
  children,
  page,
  selection = false,
  loading = false,
  error = false,
}) {
  return (
    <LayoutStyles>
      <NewStudioHeader />
      <BodyLayoutStyles>
        <div className='hide-ltLarge'>
          <NewStudioNav />
        </div>
        <SelectionWindowStyles>
          <SelectionWindowHeaderStyles>
            <Breadcrumb page={page} selection={selection} />
          </SelectionWindowHeaderStyles>
          {loading && <Loading />}
          {error && <Error error={error} />}
          <SelectionWindowMainStyles>{children}</SelectionWindowMainStyles>
        </SelectionWindowStyles>
      </BodyLayoutStyles>
    </LayoutStyles>
  )
}
