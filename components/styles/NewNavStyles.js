import styled from 'styled-components'

const NewNavSidebarContainer = styled.div`
  background: ${(props) => props.theme.gray0};
  /* width: 18vw; */
  min-width: 160px;
  /* max-width: 230px; */
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${(props) => props.theme.gray3};
  overflow: auto;

  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 16px;
    letter-spacing: 0.02rem;
  }
`

const NavSectionHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0.5rem 0;

  h2 {
    color: ${(props) => props.theme.black};
  }
  a,
  button {
    padding: 0;
    margin: 0 0.5rem 0 auto;
  }
`

const NavSection = styled.div`
  padding: 0 0.5rem;

  &:last-child {
    padding-bottom: 40vh;
    @media screen and (max-width: ${(props) => props.theme.mediumScreen}) {
      padding-bottom: 0;
    }
  }
`
export { NewNavSidebarContainer, NavSectionHeading, NavSection }
