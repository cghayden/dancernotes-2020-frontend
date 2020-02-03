import React from "react";
import { useQuery } from "@apollo/react-hooks";
import SubNavStyles from "../styles/SubNavStyles";
import StyledLink from "../StyledLink";
import styled from "styled-components";
import { PARENTS_DANCERS } from "./Queries";

const NotesSubNavStyles = styled(SubNavStyles)``;

function NotesSubNav() {
  const { data, loading, error } = useQuery(PARENTS_DANCERS);
  const dancers = data ? data.parentsDancers : null;

  return (
    <>
      <NotesSubNavStyles>
        <h2>Notes</h2>
        <ul>
          <li>
            <StyledLink activeClassName="active" href="/parent/notes/routines">
              <a>Routines</a>
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
            <StyledLink activeClassName="active" href="/parent/notes/events">
              <a>Events</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink activeClassName="active" href="/parent/account/dancers">
              <a>Dancers</a>
            </StyledLink>
          </li>
          {dancers && dancers.length > 1 && (
            <li>
              <StyledLink href="/parent/createCustomRoutine">
                <a>Add a Routine</a>
              </StyledLink>
            </li>
          )}
        </ul>
        {/* {dancers && (
        <h2 className="subNav-heading">Dancers</h2>
          <ul>
            {dancers.map(dancer => (
              <li key={dancer.firstName}>
                <StyledLink
                  activeClassName="active"
                  href={`/parent/account/dancers`}
                >
                  <a>{dancer.firstName}</a>
                </StyledLink>
              </li>
            ))}
          </ul>
        )} */}
      </NotesSubNavStyles>
      {/* <Modal open={showEvents} setOpen={setShowEvents}>
        <EventsLinksModal />
      </Modal> */}
    </>
  );
}
export default NotesSubNav;
