import styled from 'styled-components'
import StyledLink from '../StyledLink'

const NewNavSidebarContainer = styled.div`
  background: ${(props) => props.theme.gray0};
  width: 18vw;
  min-width: 160px;
  max-width: 230px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${(props) => props.theme.gray3};
  overflow: scroll;
  color: ${(props) => props.theme.gray6};

  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 16px;
    letter-spacing: 0.02rem;
  }
`

const SubNav = styled(NewNavSidebarContainer)``

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

export default function NewStudioNav() {
  return (
    <NewNavSidebarContainer>
      <NavSection>
        <NavSectionHeading>
          <h2>Manage</h2>
        </NavSectionHeading>
        <ul>
          <li>
            <StyledLink
              activeClassName='activeStudioNav'
              href='/studio/classes'
            >
              <a className='btn-nav'>Classes</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              activeClassName='activeStudioNav'
              href='/studio/dancers'
            >
              <a className='btn-nav'>Dancers</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink activeClassName='activeStudioNav' href='/studio/events'>
              <a className='btn-nav'>Events</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              activeClassName='activeStudioNav'
              href='/studio/hairstyles'
            >
              <a className='btn-nav'>Hair Styles</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink activeClassName='activeStudioNav' href='/studio/makeup'>
              <a className='btn-nav'>Makeup</a>
            </StyledLink>
          </li>
        </ul>
      </NavSection>
      <NavSection>
        <h2>Accounts</h2>
        <ul>
          <li>
            <StyledLink activeClassName='activeStudioNav' href='accounts'>
              <a className='btn-nav'>Accounts</a>
            </StyledLink>
          </li>
        </ul>
      </NavSection>
      <NavSection>
        <h2>Manage</h2>
        <ul>
          <li>
            <StyledLink
              activeClassName='activeStudioNav'
              href='/studio/oldClasses'
            >
              <a>Old Classes View</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              activeClassName='activeStudioNav'
              href='/studio/newClasses-Top-Filter'
            >
              <a>Classes v2 TopFilt</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              activeClassName='activeStudioNav'
              href='/studio/oldDancers'
            >
              <a>Old Dancers View</a>
            </StyledLink>
          </li>
        </ul>
      </NavSection>
    </NewNavSidebarContainer>
  )
}

export { NavSection, NewNavSidebarContainer, SubNav, NavSectionHeading }
