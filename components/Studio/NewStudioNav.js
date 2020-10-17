import React from "react";
import styled from "styled-components";
import SubNavStyles from "../styles/SubNavStyles";
import StyledLink from "../StyledLink";

const NavSection = styled.div`
  border-bottom: 1px solid white;
  padding: 10px 0;
  h2 {
    color: ${(props) => props.theme.black};
    padding-left: 1rem;
  }
`;
const NavStyles = styled.nav`
max-width: 230px;
width: 20vw;
min-width: 180px;
  background: ${(props) => props.theme.gray0};
  color: ${(props) => props.theme.black};
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${(props) => props.theme.gray3};
  /* padding-left: 1rem; */
  /* padding-right: 1rem; */
  
  /* border-bottom: 1px solid ${(props) => props.theme.gray2}; */
  /* height: 100vh; */
  /* position: fixed; */
  /* top: ${(props) => props.theme.mobileStatusBarHeight}; */
  /* left: 0; */
  /* right: 0; */
  /* z-index: 120; */
  /* z-index to keep it on top of main, to allow click events on navlinks */
  /* h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    display: none;
    text-transform: none;
  } */

  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 14px;
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

    &:hover,
    &:focus {
      color: ${(props) => props.theme.indigo0};
      background: ${(props) => props.theme.indigo5};
      outline: none;
      /* border-bottom: 2px solid ${(props) => props.theme.indigo8}; */
      /* margin-bottom: -2px; */
    }
    
  }
`;

export default function NewStudioNav() {
  return (
    <NavStyles>
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
              href="/studio/newDancers"
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
        <h2>My Studio</h2>
        <ul>
          <li>
            <StyledLink activeClassName="active" href="teachers">
              <a>Classes</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink activeClassName="active" href="dancers">
              <a>Dancers</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink activeClassName="active" href="events">
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
    </NavStyles>
  );
}
