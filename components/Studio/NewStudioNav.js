import styled from "styled-components";
import NavSection from "../styles/NavSection";
import NewNavSidebarContainer from "../styles/NewNavSidebarContainer";
import StyledLink from "../StyledLink";

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
              href="/studio/newClasses"
            >
              <a>Classes View 2</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              activeClassName="activeStudioNav"
              href="/studio/newClasses-Top-Nav"
            >
              <a>Classes v2 TopFilt</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              activeClassName="activeStudioNav"
              href="/studio/newDancers"
            >
              <a>Dancers View 2</a>
            </StyledLink>
          </li>
        </ul>
      </NavSection>
    </NewNavSidebarContainer>
  );
}
