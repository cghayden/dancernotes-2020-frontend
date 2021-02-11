import { useState } from 'react'
import styled from 'styled-components'
import Error from '../../components/Error'
import Loading from '../../components/Loading'
import NewParentHeader from '../Parent/NewParentHeader'
import NewParentNav from './NewParentNav'
import ParentBreadcrumb from './ParentBreadcrumb'
import FilterSvg from '../Icons/FilterSvg'
import ParentMobileControls from './ParentMobileControls'

import ParentSubNavFilter from './ParentSubNavFilter'

const BodyLayout = styled.div`
  display: flex;
`

const Layout = styled.div`
  height: 100vh;
`

const SelectionWindow = styled.div`
  height: 100vh;
  overflow-y: scroll;
  position: relative;
  flex-grow: 1;
`

const SelectionWindowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  button {
    margin: 0;
    padding: 0;
  }
`

const SelectionWindowMain = styled.div`
  width: 100%;
  background: ${(props) => props.theme.gray0};
  /* height: 100vh; */
  padding-bottom: 50vh;
  /* padding-top: 1rem; */
  display: flex;
  flex-direction: column;
  overflow: auto;

  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 1rem;
    letter-spacing: 0.02rem;
  }
`

const MobileFilterContainer = styled.div`
  border-radius: 5px;
  box-shadow: ${(props) => props.theme.dropShadow3};
  background: ${(props) => props.theme.gray2};
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  width: 95vw;
  position: fixed;
  top: ${(props) => props.theme.studioHeaderHeight};
  right: 0;
  height: auto;
  overflow: hidden;
  z-index: 100;
  transition: all 0.5s;
  transform: translate3d(${(props) => (props.showFilter ? 0 : '110%')}, 0, 0);

  @media screen and (min-width: ${(props) => props.theme.mediumScreen}) {
    display: none;
  }
`

export default function NewParentLayout({
  children,
  page,
  selection = false,
  createLink = false,
  loading = false,
  error = false,
}) {
  const [showFilter, toggleFilter] = useState(false)

  return (
    <Layout>
      <NewParentHeader />
      <BodyLayout>
        <div className='hide-ltLarge'>
          <NewParentNav />
        </div>
        <div className='hide-ltMedium'>
          <ParentSubNavFilter page={page} createLink={createLink} />
        </div>
        <MobileFilterContainer showFilter={showFilter}>
          <ParentMobileControls
            page={page}
            createLink={createLink}
            toggleFilter={toggleFilter}
          />
        </MobileFilterContainer>
        <SelectionWindow>
          <SelectionWindowHeader>
            <ParentBreadcrumb page={page} selection={selection} />
            <button
              className='hide-gtMedium btn-icon'
              onClick={() => toggleFilter(!showFilter)}
            >
              <FilterSvg w='20' h='20' />
            </button>
          </SelectionWindowHeader>
          {loading && <Loading />}
          {error && <Error error={error} />}
          <SelectionWindowMain>{children}</SelectionWindowMain>
        </SelectionWindow>
      </BodyLayout>
    </Layout>
  )
}
