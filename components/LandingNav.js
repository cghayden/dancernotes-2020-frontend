import React from "react";
import styled from "styled-components";
import Link from "next/link";

const LandingNavStyle = styled.nav`
  padding-top: 1rem;
  display: grid;
  grid-template-columns: min-content 1fr max-content;

  .brand {
    font-size: 24px;
    font-family: "Dancing Script", cursive;
    padding-left: 1rem;
  }
  .login {
    justify-self: right;
    padding-right: 1rem;
    display: flex;
    justify-items: space-around;
    button {
      margin: 0;
    }
  }
  @media (min-width: ${props => props.theme.largeScreen}) {
    grid-template-columns: 1fr 3fr 1fr;
    .brand {
      font-size: 1.75rem;
    }
  }
`;

const AboutNav = styled.div`
  display: flex;
  justify-content: space-evenly;
  grid-column: 1/-1;

  @media (min-width: ${props => props.theme.largeScreen}) {
    /* display: flex; */
    grid-row: 1;
    grid-column: 2;
  }
`;

const AboutButton = styled.button`
  padding-left: 0;
  padding-right: 0;
  :hover {
    background-color: transparent;
    color: unset;
  }
`;

const LandingNav = ({ setActive }) => {
  return (
    <header>
      <LandingNavStyle>
        <AboutButton className="brand" onClick={() => setActive("about")}>
          dancernotes
        </AboutButton>
        <div className="login">
          <button onClick={() => setActive("signin")}>Sign In</button>
          <button onClick={() => setActive("signup")}>Sign Up</button>
        </div>
        <AboutNav>
          <AboutButton
            onClick={() => {
              setActive("aboutParent");
            }}
          >
            <p>Parents</p>
          </AboutButton>

          <AboutButton
            onClick={() => {
              setActive("aboutStudio");
            }}
          >
            Studios
          </AboutButton>

          <AboutButton
            onClick={() => {
              setActive("aboutRetail");
            }}
          >
            Retailers
          </AboutButton>
        </AboutNav>
      </LandingNavStyle>
    </header>
  );
};

export default LandingNav;
export { LandingNavStyle, AboutButton };
