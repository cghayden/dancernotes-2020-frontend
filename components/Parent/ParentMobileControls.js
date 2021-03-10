import { useState } from 'react'
import { useQuery } from '@apollo/client'

import { PARENT_USER_QUERY } from './Queries'
import styled from 'styled-components'
import { SliderLabel, SliderInput, Slider } from '../styles/SmallSliderToggler'
import { useDisplayControls } from './ParentDisplayProvider'
import DancerRoutineTogglers from './DancerRoutineTogglers'
// import LockedSvg from '../Icons/LockedSvg'
import XSvg from '../Icons/XSvg'
import TrashIcon from '../Icons/TrashIcon'

const ControlPanelStyles = styled.div`
  z-index: 130;
  overflow-y: auto;
  width: 100%;
  height: 85vh;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-rows: 50px 1fr;
  position: relative;
`
const FilterHeaderStyles = styled.div`
  grid-column: 1/-1;
  display: flex;
  align-items: center;
  align-self: flex-start;
  justify-content: space-between;
  h2 {
    flex-grow: 1;
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

const StudioTogglersContainer = styled.div`
  background: ${(props) => props.theme.gray0};
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 5px;
  margin-bottom: 8px;
`
const GroupOfCheckboxes = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  @media (min-width: ${(props) => props.theme.largeScreen}) {
  }
`

const StudioTogglerLabel = styled.label`
  font-size: 16px;
  padding-left: 0.5rem;
  font-weight: 600;
  color: ${(props) =>
    props.disabled ? props.theme.disabledText : props.theme.lighterBlack};
`
const AllTogglersContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 60px;
  overflow-y: auto;
`
const ParentMobileControls = ({ toggleFilter }) => {
  const [showHelp, setShowHelp] = useState(false)
  const { data, loading, error } = useQuery(PARENT_USER_QUERY)

  const { studios, customRoutines, dancers } = data
    ? data.parentUser
    : { studios: [], customRoutines: [], dancers: [] }

  const {
    hiddenIds,
    toggleId,
    competitionMode,
    toggleCompetitionMode,
  } = useDisplayControls()
  const independents = customRoutines.filter((routine) => !routine.studio)
  const hasStudioAndIndependents = studios.length > 0 && independents.length > 0
  const showAllStudioFilter = studios.length > 1 || hasStudioAndIndependents
  return (
    <ControlPanelStyles>
      <FilterHeaderStyles>
        <h2>Display:</h2>
        <div>
          {/* <button
            className='btn-icon'
            title='Unlock Filter'
            onClick={() => console.log('toggle filter lock')}
          >
            <LockedSvg w={'16'} h={'16'} />
          </button> */}
          <button
            className='btn-icon'
            title='Clear all filters'
            onClick={() => toggleId('clear')}
            title='Clear Filter'
          >
            <TrashIcon w={'18'} h={'18'} />
          </button>
          <button
            className='btn-icon'
            onClick={() => toggleFilter(false)}
            title='Close Filter Menu'
          >
            <XSvg w={'18'} h={'18'} />
          </button>
        </div>
      </FilterHeaderStyles>
      <AllTogglersContainer>
        {dancers.map((dancer) => (
          <DancerRoutineTogglers
            key={dancer.id}
            dancer={dancer}
            hiddenIds={hiddenIds}
            toggleId={toggleId}
          />
        ))}
        {showAllStudioFilter && (
          <StudioTogglersContainer>
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
                </CheckboxAndLabelContainer>
              ))}
              {independents.length > 0 && (
                <CheckboxAndLabelContainer>
                  <SliderLabel
                    id={`independents-label`}
                    htmlFor={`independents-toggler`}
                  >
                    <SliderInput
                      aria-labelledby={`independents-label`}
                      name={`independents-toggler`}
                      id={`independents-toggler`}
                      type='checkbox'
                      checked={!hiddenIds.includes('all')}
                      onChange={() => toggleId('all')}
                    />
                    <Slider checked={!hiddenIds.includes('all')}></Slider>
                  </SliderLabel>
                  <StudioTogglerLabel disabled={hiddenIds.includes('all')}>
                    Independents
                  </StudioTogglerLabel>
                </CheckboxAndLabelContainer>
              )}
            </GroupOfCheckboxes>
          </StudioTogglersContainer>
        )}
        <StudioTogglersContainer>
          <GroupOfCheckboxes>
            <CheckboxAndLabelContainer>
              <SliderLabel id={'compMode-label'} htmlFor={'compMode-toggler'}>
                <SliderInput
                  aria-labelledby={'compMode-label'}
                  name={'compMode-toggler'}
                  id={'compMode-toggler'}
                  type='checkbox'
                  checked={competitionMode}
                  onChange={() => toggleCompetitionMode()}
                />
                <Slider checked={competitionMode}></Slider>
              </SliderLabel>
              <StudioTogglerLabel>
                Display Competition Schedule
              </StudioTogglerLabel>
            </CheckboxAndLabelContainer>
          </GroupOfCheckboxes>
        </StudioTogglersContainer>
      </AllTogglersContainer>
    </ControlPanelStyles>
  )
}

export default ParentMobileControls
export { ControlPanelStyles, GroupOfCheckboxes, CheckboxAndLabelContainer }

{
  /* <CompModeToggler>
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
      </CompModeToggler> */
}
// {showHelp && (
//   <HelpDiv>
//     <HelpMessage>
//       Control what routines are displayed by selecting a dance
//       individually, or clicking on a dancer's name/image to toggle all of
//       his/her dances.
//     </HelpMessage>
//     <HelpMessage>
//       Competition View will show only those routines that have a
//       competition entry number, sorted by entry number/ performance time
//     </HelpMessage>
//     <button
//       type='button'
//       className='btn-danger-outline'
//       onClick={() => {
//         setShowHelp(false)
//       }}
//     >
//       Dismiss
//     </button>
//   </HelpDiv>
// )}
