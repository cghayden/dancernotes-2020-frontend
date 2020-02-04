import styled from "styled-components";

const NavStyles = styled.nav`
  position: fixed;
  /* grid-gap: 5px; */
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;

  align-items: center;
  /* grid-template-columns: repeat(auto-fit, minmax(40px, 1fr)); */
  /* place-items: center; */
  height: ${props => props.theme.navHeight};
  z-index: 1000;
  background-color: ${props => props.theme.background};
  /* color: ${props => props.theme.indigo9}; */

  a,
  button {
    font-family: "Source Sans Pro", sans-serif;
    display: flex;
    align-items: center;
    margin: 0;
    background: none;
    border: none;
    font-weight: 400;
    box-shadow: none;
    :hover{
      margin-bottom: -2px;
      border-radius: 0;
      background: none;
      color: ${props => props.theme.indigo8};
      border-bottom: 2px solid ${props => props.theme.indigo8}; 
    }
  }

  @media (min-width: ${props => props.theme.largeScreen}) {
    display: none;
  }
  @media (max-width: 374px) {
    a,
    button {
      font-size: 1rem;
    }
  }
`;

const DesktopNavStyles = styled(NavStyles)`
  display: none;

  @media (min-width: ${props => props.theme.largeScreen}) {
    display: flex;
    top: 0;
    bottom: unset;
    border-bottom: 1px solid ${props => props.theme.gray4};
  }
`;

const GenericNavStyles = styled(NavStyles)`
  top: 0;
  bottom: unset;
  background-color: transparent;
  a,
  button {
    color: ${props => props.theme.indigo0};
    padding: ${props => props.theme.space[3]}px;
  }
  .logo {
    margin: 0;
    display: inline-block;
    font-family: "Dancing Script", cursive;
  }
  .brand {
    font-size: ${props => props.theme.fontSizes[4]}px;
    font-family: "Dancing Script", cursive;
  }
  @media (min-width: ${props => props.theme.largeScreen}) {
    display: flex;
    .brand {
      font-size: 2rem;
    }
  }
`;

export { NavStyles, DesktopNavStyles, GenericNavStyles };
