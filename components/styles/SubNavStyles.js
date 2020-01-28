import styled from "styled-components";

const SubNavStyles = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.theme.blackText};
  background: ${props => props.theme.background};
  padding: 0.5rem;
  box-shadow: ${props => props.theme.dropShadow1};
  height: 5rem;
  position: fixed;
  top: ${props => props.theme.mobileStatusBarHeight};
  left: 0;
  right: 0;
  z-index: 120;
  /* z-index to keep it on top of main, to allow click events on navlinks */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    display: none;
    text-transform: none;
  }

  .active {
    color: ${props => props.theme.vividBlue8};
    font-weight: bold;
  }

  ul {
    display: flex;
    justify-content: center;
    font-size: 12px;
    letter-spacing: 0.02rem;
  }

  a,
  button {
    border-radius: 0;
    margin: 0;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;

    &:hover,
    &:focus {
      color: ${props => props.theme.indigo8};
      background: none;
      outline: none;
      border-bottom: 2px solid ${props => props.theme.indigo8};
      margin-bottom: -2px;
    }
  }
  @media (min-width: ${props => props.theme.largeScreen}) {
    a,
    button {
      &:hover,
      &:focus {
        border-bottom: none;
        margin-bottom: 0;
        border-left: 2px solid ${props => props.theme.indigo8};
        margin-left: -2px;
      }
    }
    align-items: unset;
    padding-top: 1rem;
    top: ${props => props.theme.navHeight};
    padding-left: 4vw;
    box-shadow: none;
    height: 100vw;
    overflow-y: scroll;
    width: 18vw;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      /* padding-left: 1rem; */
      font-size: 1.35rem;
      display: block;
      /* right: unset; */
      /* text-align: left; */
      padding-bottom: 1rem;
    }
    ul {
      /* padding-left: 1rem; */
      padding-bottom: 1rem;
      flex-direction: column;
      align-items: flex-start;
      font-size: 1rem;
    }
  }
`;

export default SubNavStyles;
