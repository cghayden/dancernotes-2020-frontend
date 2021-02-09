import styled from 'styled-components'
import Error from '../../components/Error'
import Loading from '../../components/Loading'
import NewParentHeader from '../Parent/NewParentHeader'
import NewParentNav from './NewParentNav'

import ParentBreadcrumb from './ParentBreadcrumb'

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
  /* height: 100vh; */
  padding-bottom: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;

  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 1rem;
    letter-spacing: 0.02rem;
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
      <NewParentHeader />
      <BodyLayout>
        <div className='hide-ltLarge'>
          <NewParentNav />
        </div>
        <SelectionWindow>
          <SelectionWindowHeader>
            <ParentBreadcrumb page={page} selection={selection} />
          </SelectionWindowHeader>
          {loading && <Loading />}
          {error && <Error error={error} />}
          <SelectionWindowMain>{children}</SelectionWindowMain>
        </SelectionWindow>
      </BodyLayout>
    </NoFiltLayout>
  )
}
