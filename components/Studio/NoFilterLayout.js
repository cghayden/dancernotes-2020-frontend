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

const NoFiltLayout = styled.div`
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
  height: 100vh;
  padding-bottom: 50vh;
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

export default function NoFilterLayout({
  children,
  page,
  selection = false,
  loading = false,
  error = false,
}) {
  return (
    <NoFiltLayout>
      <NewStudioHeader />
      <BodyLayout>
        <div className='hide-ltLarge'>
          <NewStudioNav />
        </div>
        <SelectionWindow>
          <SelectionWindowHeader>
            <Breadcrumb page={page} selection={selection} />
          </SelectionWindowHeader>
          {loading && <Loading />}
          {error && <Error error={error} />}
          <SelectionWindowMain>{children}</SelectionWindowMain>
        </SelectionWindow>
      </BodyLayout>
    </NoFiltLayout>
  )
}
