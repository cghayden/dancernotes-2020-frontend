import styled from 'styled-components'

const ControlPanelStyles = styled.div`
  padding: 1rem 1rem 100px 1rem;
  transform: ${(props) =>
    props.showControlPanel ? 'translateX(0%)' : 'translateX(150%)'};
  transition: all 0.4s;
  position: fixed;
  top: ${(props) => props.theme.mobileStatusBarHeight};
  margin-top: 5px;
  left: 3vw;
  width: 94vw;
  height: 75vh;
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.hoveringDropdownShadow},
    ${(props) => props.theme.perimeterShadow};
  background-color: ${(props) => props.theme.gray0};
  z-index: 130;
  overflow-y: scroll;

  @media (min-width: ${(props) => props.theme.largeScreen}) {
    background-color: ${(props) => props.theme.background};
    width: ${(props) => props.theme.controlPanelWidth};
    height: 90vh;
    padding: 1rem 1rem 100px 3vw;
    transform: translateX(0%);
    border-radius: 0;
    box-shadow: none;
    display: block;
    left: auto;
    right: 0;
    top: ${(props) => props.theme.navHeight};
    margin-top: 0;
    ul {
      font-size: 1rem;
      align-items: start;
    }
  }
`

const ControlPanelHeading = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export { ControlPanelStyles, ControlPanelHeading }
