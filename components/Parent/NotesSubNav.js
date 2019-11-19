import React from "react";
import SubNavStyles from "../styles/SubNavStyles";
import StyledLink from "../StyledLink";
import SidebarPosition from "../styles/SidebarPosition";
import styled from "styled-components";

const NotesSubNavStyles = styled(SubNavStyles)`
  .comps {
    display: none;
  }
  .conventions {
    display: none;
  }
  @media (min-width: ${props => props.theme.largeScreen}) {
    .comps {
      display: block;
    }
    .conventions {
      display: list-item;
    }
  }
`;

function NotesSubNav(props) {
  //todo -- query dancers for direct links

  return (
    <SidebarPosition>
      <NotesSubNavStyles>
        <h2 className="subNav-heading">Notes</h2>
        <ul>
          <li>
            <StyledLink activeClassName="active" href="/parent/notes/routines">
              <a>Routines</a>
            </StyledLink>
          </li>
          <li className="comps">
            <StyledLink
              activeClassName="active"
              href="/parent/notes/competitions"
            >
              <a>Competitions</a>
            </StyledLink>
          </li>
          <li className="conventions">
            <StyledLink
              activeClassName="active"
              href="/parent/notes/conventions"
            >
              <a>Conventions</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink activeClassName="active" href="/parent/events">
              <a>Events</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink activeClassName="active" href="/parent/notes/makeup">
              <a>Makeup</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              activeClassName="active"
              href="/parent/notes/hairstyles"
            >
              <a>Hair</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink href="/parent/createCustomRoutine">
              <a>Add a Routine</a>
            </StyledLink>
          </li>
        </ul>
        <h2 className="subNav-heading">Dancers?</h2>
        {/* DancersLink should be own component to hold the query? */}
        {/* <ul>
          {dancers &&
            dancers.map(dancer => (
              <li key={dancer.id}>
                <StyledLink
                  activeClassName="active"
                  href={`/parent/account/dancers/#${dancer.id}`}
                >
                  <a>{dancer.firstName}</a>
                </StyledLink>
              </li>
            ))}
        </ul> */}
      </NotesSubNavStyles>
    </SidebarPosition>
  );
}
export default NotesSubNav;
