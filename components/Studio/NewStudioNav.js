import styled from "styled-components";
import StyledLink from "../StyledLink";

const NavSection = styled.div`
  /* not last child: */
  &:after {
    height: 2px;
    width: 75%;
    margin: 4px auto;
    content: "";
    display: block;
    background-image: linear-gradient(
      to right,
      ${(props) => props.theme.gray0} 0%,
      ${(props) => props.theme.indigo1} 10%,
      ${(props) => props.theme.indigo5} 50%,
      ${(props) => props.theme.indigo1} 90%,
      ${(props) => props.theme.gray0} 100%
    );
  }

  h2 {
    color: ${(props) => props.theme.black};
    padding: 1rem 0 1rem 1rem;
  }
`;

const NewNavSidebarContainer = styled.div`
  background: ${(props) => props.theme.gray0};
  min-width: 150px;
  max-width: 200px;
  width: 20vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${(props) => props.theme.gray3};

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
`;

const NavSectionHeading = styled.div`
  display: flex;
  button {
    padding: 0;
    margin: 0 5px 0 auto;
  }
`;

export default function NewStudioNav() {
  return (
    <NewNavSidebarContainer>
      <NavSection>
        <h2>Manage</h2>
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
            <StyledLink activeClassName="activeStudioNav" href="events">
              <a>Events</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink activeClassName="active" href="hairstyles">
              <a>Hairstyles</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink activeClassName="active" href="makeup">
              <a>Makeup</a>
            </StyledLink>
          </li>
        </ul>
      </NavSection>
      <NavSection>
        <h2>Accounts</h2>
        <ul>
          <li>
            <StyledLink activeClassName="active" href="accounts">
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

export { NavSection, NewNavSidebarContainer, NavSectionHeading };
