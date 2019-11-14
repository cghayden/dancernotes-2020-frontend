import React, { useContext } from "react";
import { ControlPanelStyles } from "../styles/ControlPanelStyles";
import DisplayController from "./DisplayController";
import { ParentDisplayContext } from "../ParentDisplayProvider";

const ControlPanel = props => {
  const DisplayContext = useContext(ParentDisplayContext);
  const showControlPanel = DisplayContext.showControlPanel;

  return (
    <ControlPanelStyles showControlPanel={showControlPanel}>
      <h2 className="controls-heading">Display:</h2>
      {props.dancerIds.map(id => {
        return <DisplayController key={id} dancerId={id} />;
      })}
    </ControlPanelStyles>
  );
};

export default ControlPanel;
