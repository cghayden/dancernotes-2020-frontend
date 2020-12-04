import { useState } from 'react'
import styled from 'styled-components'
import Error from '../../components/Error'
import Loading from '../../components/Loading'
import NewStudioHeader from './NewStudioHeader'
import NewStudioNav from './NewStudioNav'
import SubNavFilter from './SubNavFilter'
import Breadcrumb from './Breadcrumb'
import ActiveFilterChoices from './ActiveFilterChoices'
import FilterSvg from '../Icons/FilterSvg'
import MobileFilter from './MobileFilter'
import { SubNav, NavSection } from './NewStudioNav'

const BodyLayout = styled.div`
  display: flex;
`

const Layout = styled.div`
  height: 100vh;
  .scrollingWindow {
    height: 100vh;
    overflow-y: scroll;
    display: grid;
    grid-template-rows: minmax(4rem, auto) 1fr;
    position: relative;
    flex-grow: 1;
  }
  .modalSelectionWindow {
    height: 100vh;
    overflow-y: scroll;
    position: relative;
    padding-top: 2rem;
    flex-grow: 1;
    @media screen and (max-width: ${(props) => props.theme.mediumScreen}) {
      position: fixed;
      background: rgba(0, 0, 0, 0.5);
      z-index: 2;
      top: ${(props) => props.theme.studioHeaderHeight};
      right: 0;
      bottom: 0;
      left: 0;
      display: grid;
      align-items: center;
      justify-items: center;
      /* pointer-events: none; */
      /* opacity: ${(props) => (props.modalOpen ? 1 : 0)}; */
      transition: opacity 0.5s;
    }
  }
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
  height: 100vh;
  padding-bottom: 50vh;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  color: ${(props) => props.theme.gray6};

  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 1rem;
    letter-spacing: 0.02rem;
  }

  a,
  button {
    border-radius: 0;
    margin: 0;
    padding: 10px 0.5rem 0.5rem 0.5rem;
    text-transform: uppercase;

    &:hover {
      color: hsl(200, 95%, 95%);
      background: ${(props) => props.theme.indigo5};
    }
  }
`

const MobileFilterContainer = styled.div`
  border-radius: 5px;
  box-shadow: ${(props) => props.theme.dropShadow3};
  background: ${(props) => props.theme.gray2};
  color: ${(props) => props.theme.blackText};
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

  @media screen and (min-width: ${(props) => props.theme.largeScreen}) {
    display: none;
  }
`

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
    <Layout>
      <NewStudioHeader />
      <BodyLayout>
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
        <MobileFilterContainer showFilter={showFilter}>
          <MobileFilter
            page={page}
            createLink={createLink}
            toggleFilter={toggleFilter}
          />
        </MobileFilterContainer>
        <SelectionWindow>
          <SelectionWindowHeader>
            <Breadcrumb page={page} selection={selection} />
            <button
              className='hide-gtMedium'
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
