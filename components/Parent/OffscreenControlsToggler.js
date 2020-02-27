import styled from "styled-components";
import { useDisplayControls } from "../ParentDisplayProvider";

const OffScreenTogglerButton = styled.button`
  @media (min-width: ${props => props.theme.largeScreen}) {
    display: none;
  }
`;

function OffScreenControlsToggler({ text }) {
  const { toggleControlPanel } = useDisplayControls();
  return (
    <OffScreenTogglerButton
      className="textOnly-primary-action"
      onClick={() => {
        toggleControlPanel();
      }}
    >
      {text}
    </OffScreenTogglerButton>
  );
}

export default OffScreenControlsToggler;
