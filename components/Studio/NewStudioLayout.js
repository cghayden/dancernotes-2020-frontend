import styled from 'styled-components'
import NewStudioHeader from './NewStudioHeader'
import NewStudioNav from './NewStudioNav'

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
  .selectionWindow {
    height: 100vh;
    overflow-y: scroll;
    position: relative;
    padding-top: 2rem;
    flex-grow: 1;
    @media screen and (max-width: ${(props) => props.theme.mediumScreen}) {
      translate-x: 100%;
    }
  }
`

export default function NewStudioLayout({ children }) {
  // const studio = useStudio();

  return (
    <Layout>
      <NewStudioHeader />
      <BodyLayout>
        <div className='hide-ltLarge'>
          <NewStudioNav />
        </div>
        {children}
      </BodyLayout>
    </Layout>
  )
}
