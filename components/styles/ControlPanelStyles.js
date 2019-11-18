import styled from "styled-components";

const ControlPanelStyles = styled.div`
  justify-self: center;
  display: grid;
  padding: 1rem;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: min-content min-content;
  transform: ${props =>
    props.showControlPanel ? "translateX(0%)" : "translateX(150%)"};
  transition: all 0.4s;
  position: fixed;
  top: ${props => props.theme.mobileStatusBarHeight};
  left: 3vw;
  width: 94vw;
  height: 90vh;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.hoveringDropdownShadow},
    ${props => props.theme.perimeterShadow};
  background-color: ${props => props.theme.gray0};
  z-index: 110;
  overflow-y: scroll;

  ul {
    display: flex;
    flex-direction: column;
    font-size: 0.825rem;
    li {
      padding: 0.25rem 0;
    }
  }
  .controls-heading {
    grid-column: 1/-1;
  }

  @media (min-width: ${props => props.theme.largeScreen}) {
    background-color: ${props => props.theme.background};
    width: unset;
    min-width: 200px;
    transform: translateX(0%);
    border-radius: 0;
    box-shadow: none;
    display: block;
    position: unset;
    ul {
      font-size: 1rem;
      align-items: start;
    }
  }
`;

export { ControlPanelStyles };
