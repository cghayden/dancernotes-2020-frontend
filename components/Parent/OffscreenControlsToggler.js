import styled from "styled-components";
import { useDisplayControls } from "../Parent/ParentDisplayProvider";

const OffScreenTogglerButton = styled.button`
  margin-top: 0;
  margin-bottom: 0;
  background: ${props => (props.outline ? "none" : props.theme.indigo6)};
  padding: 6px 10px;
  color: ${props =>
    props.outline ? props.theme.indigo6 : props.theme.indigo0};
  border: ${props =>
    props.outline ? `1px solid ${props.theme.indigo6}` : null};
  @media (min-width: ${props => props.theme.largeScreen}) {
    display: none;
  }
`;

function OffScreenControlsToggler({ text, outline = false }) {
  const { toggleControlPanel } = useDisplayControls();
  return (
    <OffScreenTogglerButton
      outline={outline}
      onClick={() => {
        toggleControlPanel();
      }}
    >
      {text}
    </OffScreenTogglerButton>
  );
}

export default OffScreenControlsToggler;
