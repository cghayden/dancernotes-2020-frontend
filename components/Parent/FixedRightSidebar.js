import styled from "styled-components";
import ControlPanel from "./ControlPanel";

const FixedRightSidebarStyle = styled.div`
  background-color: ${props => props.theme.bg};
  width: 20vw;
  min-width: ${props => props.theme.sidebarWidth};
  display: none;
  justify-items: stretch;
  position: fixed;
  justify-content: center;
  top: 70px;
  bottom: 0;
  right: 0;
  left: unset;
  /* text-align: center; */
  @media (min-width: ${props => props.theme.largeScreen}) {
    display: block;
  }
`;

function FixedRightSidebar() {
  return (
    <FixedRightSidebarStyle>
      <ControlPanel />
    </FixedRightSidebarStyle>
  );
}
export default FixedRightSidebar;
