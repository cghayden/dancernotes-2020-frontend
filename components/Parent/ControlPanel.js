import { useState, useEffect } from "react";
import styled from "styled-components";
import DisplayController from "./DisplayController";
import SliderToggler from "../styles/SliderToggler";
import { useDisplayControls } from "./ParentDisplayProvider";
import OffScreenControlsToggler from "./OffscreenControlsToggler";
import {
  ControlPanelStyles,
  ControlPanelHeading
} from "../styles/ControlPanelStyles";

const AllStudioCheckboxes = styled.div`
  padding-bottom: 1.2rem;
  padding-top: 1rem;
  display: flex;
  justify-content: space-around;
  div {
    display: flex;
    align-content: center;
    margin-bottom: 0.5rem;
  }
  @media (min-width: ${props => props.theme.largeScreen}) {
    flex-direction: column;
  }
`;

const StudioLabel = styled.label`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => (props.disabled ? props.theme.disabledText : "inherit")};
`;

const DancerCheckboxes = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  margin-bottom: 100px;
  ul {
    display: flex;
    flex-direction: column;
    font-size: 0.825rem;
    li {
      padding: 0.25rem 0;
    }
  }

  @media (min-width: ${props => props.theme.largeScreen}) {
    margin-bottom: 0;
    ul {
      font-size: 1rem;
      align-items: start;
    }
  }
`;
const CompModeToggler = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 5px;
  p {
    display: inline-block;
    padding-right: 10px;
  }
  button {
    margin-top: 0;
    margin-left: auto;
    border-radius: 50%;
    font-size: 16px;
    padding: 0px 7px;
  }
`;

const HelpMessage = styled.p`
  font-size: 14px;
  padding-bottom: 4px;
`;

const HelpDiv = styled.div`
  button {
    font-size: 14px;
    padding: 5px 10px;
  }
`;
const ControlPanel = ({ studios, customRoutines, dancers }) => {
  const [showHelp, setShowHelp] = useState(false);

  // const [visited, setVisited] = useState();
  // console.log("visited:", visited);
  // useEffect(() => {
  //   setVisited(window.localStorage.getItem("visited"));
  // }, [setVisited]);
  const {
    hiddenIds,
    toggleId,
    competitionMode,
    toggleCompetitionMode,
    showControlPanel
  } = useDisplayControls();

  const independents = customRoutines.filter(routine => !routine.studio);
  const hasStudioAndIndependents =
    studios.length > 0 && independents.length > 0;
  const showAllStudioFilter = studios.length > 1 || hasStudioAndIndependents;
  return (
    <ControlPanelStyles showControlPanel={showControlPanel}>
      <ControlPanelHeading>
        <h3>Display:</h3>
        <OffScreenControlsToggler outline="true" text="Close" />
      </ControlPanelHeading>

      {showHelp && (
        <HelpDiv>
          <HelpMessage>
            Control what routines are displayed by selecting a dance
            individually, or clicking on a dancer's name/image to toggle all of
            his/her dances.
          </HelpMessage>
          <HelpMessage>
            Competition View will show only those routines that have a
            competition entry number, sorted by entry number/ performance time
          </HelpMessage>
          <button
            type="button"
            className="btn-danger-outline"
            onClick={() => {
              setShowHelp(false);
            }}
          >
            Dismiss
          </button>
        </HelpDiv>
      )}
      <CompModeToggler>
        <p>Competiton View:</p>
        <SliderToggler
          competitionMode={competitionMode}
          toggleCompetitionMode={toggleCompetitionMode}
        />
        <button
          type="button"
          className="btn-danger-outline btn-small"
          onClick={() => setShowHelp(!showHelp)}
        >
          ?
        </button>
      </CompModeToggler>
      {/* checkbox for each parent studio */}
      {showAllStudioFilter && (
        <AllStudioCheckboxes>
          {studios.map(studio => (
            <div key={studio.id}>
              <input
                checked={!hiddenIds.includes(studio.id)}
                onChange={() => toggleId(studio.id)}
                type="checkbox"
                id={studio.studioName}
                name={studio.studioName}
                value={studio.studioName}
              />
              <StudioLabel htmlFor={studio.studioName}>
                {studio.studioName}
              </StudioLabel>
            </div>
          ))}
          {independents.length > 0 && (
            <div>
              <input
                checked={!hiddenIds.includes("all")}
                onChange={() => {
                  toggleId("all");
                }}
                type="checkbox"
                id={"allIndependent"}
                name={"allIndependent"}
                value={"allIndependent"}
              />
              <StudioLabel htmlFor={"allIndependent"}>Independents</StudioLabel>
            </div>
          )}
        </AllStudioCheckboxes>
      )}

      <DancerCheckboxes>
        {dancers.map(dancer => {
          return <DisplayController key={dancer.id} dancer={dancer} />;
        })}
      </DancerCheckboxes>
    </ControlPanelStyles>
  );
};

export default ControlPanel;
export { ControlPanelStyles };
