import styled from "styled-components";
import DisplayController from "./DisplayController";
import SliderToggler from "../styles/SliderToggler";
import { useDisplayControls } from "./ParentDisplayProvider";
import OffScreenControlsToggler from "./OffscreenControlsToggler";

const ControlPanelStyles = styled.div`
  padding: 1rem 1rem 100px 1rem;
  transform: ${props =>
    props.showControlPanel ? "translateX(0%)" : "translateX(150%)"};
  transition: all 0.4s;
  position: fixed;
  top: ${props => props.theme.mobileStatusBarHeight};
  margin-top: 5px;
  left: 3vw;
  width: 94vw;
  height: 75vh;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.hoveringDropdownShadow},
    ${props => props.theme.perimeterShadow};
  background-color: ${props => props.theme.gray0};
  z-index: 130;
  overflow-y: scroll;

  @media (min-width: ${props => props.theme.largeScreen}) {
    background-color: ${props => props.theme.background};
    width: ${props => props.theme.controlPanelWidth};
    height: 90vh;
    padding: 1rem 1rem 100px 3vw;
    transform: translateX(0%);
    border-radius: 0;
    box-shadow: none;
    display: block;
    left: auto;
    right: 0;
    top: ${props => props.theme.navHeight};
    margin-top: 0;
    ul {
      font-size: 1rem;
      align-items: start;
    }
  }
`;

const ControlPanelHeading = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

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
`;
const ControlPanel = ({ dancerIds, studios, customRoutines, dancers }) => {
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
        <OffScreenControlsToggler text="Close" />
      </ControlPanelHeading>
      <CompModeToggler>
        <p>Competiton Mode:</p>
        <SliderToggler
          competitionMode={competitionMode}
          toggleCompetitionMode={toggleCompetitionMode}
        />
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
