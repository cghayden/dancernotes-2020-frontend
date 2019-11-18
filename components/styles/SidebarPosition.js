import styled from "styled-components";

// sidebar only needed on larger screen, but it styles subnav which is on mobile too
// positions fixed,
// - left or right based on passed in prop,
// - positions top, bottom
// gives width based on global theme var
const SidebarPosition = styled.div`
  display: grid;
  justify-content: center;
  /* needs to be positioned on large screens because it is position fixed. */
  @media (min-width: ${props => props.theme.largeScreen}) {
    padding: 0 2.5rem;
    overflow-y: scroll;
  }
`;

export default SidebarPosition;
