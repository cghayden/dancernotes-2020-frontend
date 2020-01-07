import styled from "styled-components";

const SubNavStyles = styled.nav`
  display: flex;

  flex-direction: column;

  align-items: center;
  color: ${props => props.theme.blackText};
  background: ${props => props.theme.background};
  padding: 1rem 0 0.5rem 1rem;
  height: 5rem;
  position: fixed;
  top: ${props => props.theme.navHeight};
  left: 0;
  right: 0;
  z-index: 1000;
  /* z-index to keep it on top of main, to allow click events on navlinks */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    display: none;
    align-self: flex-start;
    padding-left: 1rem;
  }

  .active {
    color: ${props => props.theme.vividBlue6};
  }

  ul {
    display: flex;
    justify-content: center;
    font-size: 12px;
    letter-spacing: 0.02rem;
  }

  a,
  button {
    margin: 0;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;

    &:hover,
    &:focus {
      background: none;
      outline: none;
    }
  }
  @media (min-width: ${props => props.theme.largeScreen}) {
    padding-top: 1rem;
    height: unset;
    width: 18vw;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: 1.35rem;
      display: block;
      right: unset;
      text-align: left;
      padding-bottom: 1rem;
    }
    ul {
      padding-left: 1rem;
      padding-bottom: 1rem;
      flex-direction: column;
      align-items: flex-start;
      font-size: 1rem;
    }
  }
`;

export default SubNavStyles;
