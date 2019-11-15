import React from "react";
import SubNavStyles from "../styles/SubNavStyles";
import StyledLink from "../StyledLink";
import SidebarPosition from "../styles/SidebarPosition";

function NotesSubNav(props) {
  const { dancers } = props;

  return (
    <SidebarPosition>
      <SubNavStyles>
        <div className="blur-right"></div>
        <div className="blur-left"></div>
        <h2 className="subNav-heading">Notes</h2>
        <ul>
          <li>
            <StyledLink activeClassName="active" href="/parent/notes/routines">
              <a>Routines</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              activeClassName="active"
              href="/parent/notes/competitions"
            >
              <a>Competitions</a>
            </StyledLink>
          </li>
          <li>
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
      </SubNavStyles>
    </SidebarPosition>
  );
}
export default NotesSubNav;
