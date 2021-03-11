import { useQuery } from '@apollo/client'
import styled from 'styled-components'

import { PARENT_USER_QUERY } from './Queries'
import { SliderLabel, SliderInput, Slider } from '../styles/SmallSliderToggler'
import { useDisplayControls } from './ParentDisplayProvider'
import DancerRoutineTogglers from './DancerRoutineTogglers'
import CompModeToggler from './CompModeToggler'
// import LockedSvg from '../Icons/LockedSvg'
import TrashIcon from '../Icons/TrashIcon'

const ControlPanelStyles = styled.div`
  background-color: ${(props) => props.theme.gray0};
  overflow-y: auto;
`
const ControlPanelHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  h3 {
    flex-grow: 1;
  }
`

const FilterButtons = styled.div`
  display: flex;
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
const StudioTogglersContainer = styled.div``
const GroupOfCheckboxes = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`
const StudioTogglerLabel = styled.label`
  font-size: 16px;
  padding-left: 0.5rem;
  font-weight: 600;
  color: ${(props) =>
    props.disabled ? props.theme.disabledText : props.theme.lighterBlack};
`
const ControlPanel = () => {
  const { data, loading, error } = useQuery(PARENT_USER_QUERY)
  console.log('data', data)

  const { hiddenIds, toggleId } = useDisplayControls()

  if (loading) return null
  if (error) return null

  const independents = data?.parentUser.customRoutines.filter(
    (routine) => !routine.studio
  )
  const hasStudioAndIndependents =
    data?.parentUser.studios.length > 0 && independents.length > 0
  const showAllStudioFilter =
    data?.parentUser.studios.length > 1 || hasStudioAndIndependents
  return (
    <ControlPanelStyles>
      <ControlPanelHeading>
        <h3>Display:</h3>
        <FilterButtons>
          {/* <button
            className='btn-icon'
            title='Unlock Filter'
            onClick={() => console.log('toggle filter lock')}
          >
            <LockedSvg w={'16'} h={'16'} />
          </button> */}
          <button
            type='button'
            className='btn-icon'
            title='Clear all filters'
            onClick={() => toggleId('clear')}
            title='Clear Filter'
          >
            <TrashIcon w={'16'} h={'16'} />
          </button>
        </FilterButtons>
      </ControlPanelHeading>
      <CompModeToggler />
      <div>
        {data.parentUser.dancers.map((dancer) => (
          <DancerRoutineTogglers
            key={dancer.id}
            dancer={dancer}
            hiddenIds={hiddenIds}
            toggleId={toggleId}
          />
        ))}
      </div>
      {showAllStudioFilter && (
        <div>
          <StudioTogglersContainer>
            <h2>My Studios</h2>
            <GroupOfCheckboxes>
              {data.parentUser.studios.map((studio) => (
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
                    id={`independentDances-label`}
                    htmlFor={`independentDances-toggler`}
                  >
                    <SliderInput
                      aria-labelledby={`independentDances-label`}
                      name={`independentDances-toggler`}
                      id={`independentDances-toggler`}
                      type='checkbox'
                      checked={!hiddenIds.includes('all')}
                      onChange={() => {
                        toggleId('all')
                      }}
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
        </div>
      )}
    </ControlPanelStyles>
  )
}

export default ControlPanel
export { ControlPanelStyles, GroupOfCheckboxes, CheckboxAndLabelContainer }
{
  /* {showHelp && (
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
      )} */
}
{
  /* checkbox for each parent studio */
}
