import styled from "styled-components";

const SubNavStyles = styled.nav`
  color: ${props => props.theme.blackText};
  overflow-x: scroll;
  .blur-right {
    position: absolute;
    right: 0;
    width: 30px;
    height: 2rem;
    background: linear-gradient(
      to right,
      transparent,
      ${props => props.theme.background} 85%
    );
  }
  .blur-left {
    position: absolute;
    left: 0;
    width: 30px;
    height: 2rem;
    background: linear-gradient(
      to left,
      transparent,
      ${props => props.theme.background} 85%
    );
  }
  .subNav-heading {
    display: none;
  }

  .active {
    /* font-weight: bold; */
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
    .subNav-heading {
      display: block;
    }
    ul {
      flex-direction: column;
      align-items: flex-start;
      font-size: 1rem;
    }
    h2 {
      font-size: 1.35rem;
      text-align: center;
    }
    .blur-right,
    .blur-left {
      display: none;
    }
  }
`;

export default SubNavStyles;
