import { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { PARENT_USER_QUERY } from './Queries'

import styled from 'styled-components'
import SliderToggler from '../styles/SliderToggler'
import { SliderLabel, SliderInput, Slider } from '../styles/SmallSliderToggler'
import { useDisplayControls } from './ParentDisplayProvider'
import OffScreenControlsToggler from './OffscreenControlsToggler'
import { ControlPanelHeading } from '../styles/ControlPanelStyles'

import DancerRoutineTogglers from './DancerRoutineTogglers'

const ControlPanelStyles = styled.div`
  background-color: ${(props) => props.theme.gray0};
  /* z-index: 130; */
  overflow-y: auto;

  @media (max-width: ${(props) => props.theme.largeScreen}) {
    display: none;
  }
`
const CompModeToggler = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
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
`

const HelpMessage = styled.p`
  font-size: 14px;
  padding-bottom: 4px;
`

const HelpDiv = styled.div`
  button {
    font-size: 14px;
    padding: 5px 10px;
  }
`
const CheckboxAndLabelContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  margin: 0.25em 0 0.25em 0.5em;
  input {
    color: ${(props) =>
      props.disabled ? props.theme.disabledText : 'inherit'};
    margin-top: 4px;
  }
`

const TogglersContainer = styled.div`
  /* border-bottom: 1px solid ${(props) => props.theme.gray3}; */
`
const GroupOfCheckboxes = styled.div`
  /* padding-bottom: 1.2rem; */
  /* padding-top: 1rem; */
  display: flex;
  justify-content: space-around;
  /* div {
    display: flex;
    align-content: center;
    margin-bottom: 0.5rem;
  } */
  @media (min-width: ${(props) => props.theme.largeScreen}) {
    flex-direction: column;
  }
`

const StudioTogglerLabel = styled.label`
  font-size: 18px;
  padding-left: 0.5rem;
  font-weight: 600;
  color: ${(props) => (props.disabled ? props.theme.disabledText : 'inherit')};
`
const DancerTogglerLabel = styled.label`
  padding-left: 0.5rem;
  font-weight: 600;
  color: ${(props) => (props.disabled ? props.theme.disabledText : 'inherit')};
`

const DancerTogglerAndCheckboxes = styled.div`
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

  @media (min-width: ${(props) => props.theme.largeScreen}) {
    margin-bottom: 0;
    ul {
      font-size: 1rem;
      align-items: start;
    }
  }
`

const ControlPanel = () => {
  const [showHelp, setShowHelp] = useState(false)
  const { data, loading, error } = useQuery(PARENT_USER_QUERY)

  const { studios, customRoutines, dancers } = data
    ? data.parentUser
    : { studios: [], customRoutines: [], dancers: [] }

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
    showControlPanel,
  } = useDisplayControls()
  const independents = customRoutines.filter((routine) => !routine.studio)
  const hasStudioAndIndependents = studios.length > 0 && independents.length > 0
  const showAllStudioFilter = studios.length > 1 || hasStudioAndIndependents
  return (
    <ControlPanelStyles showControlPanel={showControlPanel}>
      <ControlPanelHeading>
        <h3>Display:</h3>
        <OffScreenControlsToggler outline='true' text='Close' />
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
            type='button'
            className='btn-danger-outline'
            onClick={() => {
              setShowHelp(false)
            }}
          >
            Dismiss
          </button>
        </HelpDiv>
      )}
      {/* <CompModeToggler>
        <p>Competiton View:</p>

        <SliderToggler
          competitionMode={competitionMode}
          toggleCompetitionMode={toggleCompetitionMode}
        />
        <button
          type='button'
          className='btn-danger-outline btn-icon'
          onClick={() => setShowHelp(!showHelp)}
        >
          <span>?</span>
        </button>
      </CompModeToggler> */}
      {/* checkbox for each parent studio */}
      <div>
        {/* <h2>My Dancers</h2> */}
        {/* <DancerTogglerAndCheckboxes> */}
        {dancers.map(
          (dancer) => (
            <DancerRoutineTogglers
              key={dancer.id}
              dancer={dancer}
              hiddenIds={hiddenIds}
              toggleId={toggleId}
            />
          )

          // <DisplayController key={dancer.id} dancer={dancer} />
        )}
      </div>
      {showAllStudioFilter && (
        <div>
          <TogglersContainer>
            <h2>My Studios</h2>
            <GroupOfCheckboxes>
              {studios.map((studio) => (
                <CheckboxAndLabelContainer key={studio.id}>
                  <SliderLabel
                    id={`${studio.studioName}-label`}
                    htmlFor={`${studio.studioName}-toggler`}
                  >
                    <SliderInput
                      aria-labelledby={`${studio.studioName}-label`}
                      name={`${studio.studioName}-toggler`}
                      id={`${studio.studioName}-toggler`}
                      type='checkbox'
                      checked={!hiddenIds.includes(studio.id)}
                      onChange={() => toggleId(studio.id)}
                    />
                    <Slider checked={!hiddenIds.includes(studio.id)}></Slider>
                  </SliderLabel>

                  <StudioTogglerLabel disabled={hiddenIds.includes(studio.id)}>
                    {studio.studioName}
                  </StudioTogglerLabel>
                  {/* <input
        checked={!hiddenIds.includes(studio.id)}
        onChange={() => toggleId(studio.id)}
        type='checkbox'
        id={studio.studioName}
        name={studio.studioName}
        value={studio.studioName}
        /> */}
                </CheckboxAndLabelContainer>
              ))}
              {independents.length > 0 && (
                <div>
                  <input
                    checked={!hiddenIds.includes('all')}
                    onChange={() => {
                      toggleId('all')
                    }}
                    type='checkbox'
                    id={'allIndependent'}
                    name={'allIndependent'}
                    value={'allIndependent'}
                  />
                  <StudioTogglerLabel htmlFor={'allIndependent'}>
                    Independents
                  </StudioTogglerLabel>
                </div>
              )}
            </GroupOfCheckboxes>
          </TogglersContainer>
        </div>
      )}
      {/* </DancerTogglerAndCheckboxes> */}
    </ControlPanelStyles>
  )
}

export default ControlPanel
export { ControlPanelStyles, GroupOfCheckboxes, CheckboxAndLabelContainer }
