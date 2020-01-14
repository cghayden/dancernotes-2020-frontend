import React, { useContext } from "react";
import DisplayController from "./DisplayController";
import { ParentDisplayContext } from "../ParentDisplayProvider";

import styled from "styled-components";

const ControlPanelStyles = styled.div`
  /* justify-self: center; */
  display: grid;
  padding: 1rem 1rem 100px 0.5rem;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: min-content min-content;
  transform: ${props =>
    props.showControlPanel ? "translateX(0%)" : "translateX(150%)"};
  transition: all 0.4s;
  position: fixed;
  top: ${props => props.theme.mobileMainTop};
  left: 3vw;
  width: 94vw;
  height: 75vh;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.hoveringDropdownShadow},
    ${props => props.theme.perimeterShadow};
  background-color: ${props => props.theme.gray0};
  z-index: 130;
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
    padding-bottom: 1rem;
  }

  @media (min-width: ${props => props.theme.largeScreen}) {
    /* in desktop animation-fill-mode, padding is provided by Content Layout.  In ::-moz-list-bullet, it needs padding because it is its own self contained offscreen/onscreen container */
    /* padding-left: 0;
    padding-right: 0; */
    background-color: ${props => props.theme.background};
    width: ${props => props.theme.controlPanelWidth};
    transform: translateX(0%);
    border-radius: 0;
    box-shadow: none;
    display: block;
    left: auto;
    right: 0;
    top: ${props => props.theme.navHeight};
    ul {
      font-size: 1rem;
      align-items: start;
    }
  }
`;

const ControlPanel = ({ dancerIds }) => {
  const DisplayContext = useContext(ParentDisplayContext);
  const showControlPanel = DisplayContext.showControlPanel;

  return (
    <ControlPanelStyles showControlPanel={showControlPanel}>
      <h2 className="controls-heading">Display:</h2>
      {dancerIds.map(id => {
        return <DisplayController key={id} dancerId={id} />;
      })}
    </ControlPanelStyles>
  );
};

export default ControlPanel;
export { ControlPanelStyles };
