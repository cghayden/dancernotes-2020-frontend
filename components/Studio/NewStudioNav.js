import styled from "styled-components";
import StyledLink from "../StyledLink";

const NavSection = styled.div`
  padding: 0 0.5rem;
  &:last-child {
    padding-bottom: 40vh;
  }
`;

const NewNavSidebarContainer = styled.div`
  background: ${(props) => props.theme.gray0};
  min-width: 130px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${(props) => props.theme.gray3};
  /* grid-column: 1/4; */
  overflow: scroll;

  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 16px;
    letter-spacing: 0.02rem;
  }

  a,
  button {
    border-radius: 0;
    margin: 0;
    padding: 10px 0.5rem 0.5rem 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;

    &:hover {
      color: hsl(200, 95%, 95%);
      background: ${(props) => props.theme.indigo5};
    }
  }
  /* @media (max-width: ${(props) => props.theme.largeScreen}) {
    h2 {
      font-size: 1rem;
    }
    a,
    button {
      font-size: 0.8rem;
    }
  } */
`;

const SubNav = styled(NewNavSidebarContainer)`
  /* grid-column: 1/5; */
`;

const NavSectionHeading = styled.div`
  display: flex;
  padding: 0.5rem 0;

  h2 {
    color: ${(props) => props.theme.black};
  }
  button {
    padding: 0;
    margin: 0 0.5rem 0 auto;
  }
`;

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
              activeClassName="activeStudioNav"
              href="/studio/classes"
            >
              <a>Classes</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              activeClassName="activeStudioNav"
              href="/studio/dancers"
            >
              <a>Dancers</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink activeClassName="activeStudioNav" href="/studio/events">
              <a>Events</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              activeClassName="activeStudioNav"
              href="/studio/hairstyles"
            >
              <a>Hairstyles</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink activeClassName="activeStudioNav" href="/studio/makeup">
              <a>Makeup</a>
            </StyledLink>
          </li>
        </ul>
      </NavSection>
      <NavSection>
        <h2>Accounts</h2>
        <ul>
          <li>
            <StyledLink activeClassName="activeStudioNav" href="accounts">
              <a>Accounts</a>
            </StyledLink>
          </li>
        </ul>
      </NavSection>
      <NavSection>
        <h2>Manage</h2>
        <ul>
          <li>
            <StyledLink
              activeClassName="activeStudioNav"
              href="/studio/oldClasses"
            >
              <a>Old Classes View</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              activeClassName="activeStudioNav"
              href="/studio/newClasses-Top-Filter"
            >
              <a>Classes v2 TopFilt</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              activeClassName="activeStudioNav"
              href="/studio/oldDancers"
            >
              <a>Old Dancers View</a>
            </StyledLink>
          </li>
        </ul>
      </NavSection>
    </NewNavSidebarContainer>
  );
}

export { NavSection, NewNavSidebarContainer, SubNav, NavSectionHeading };
