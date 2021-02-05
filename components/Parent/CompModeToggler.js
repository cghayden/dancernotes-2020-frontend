import styled from 'styled-components'
import { useDisplayControls } from './ParentDisplayProvider'
import { SliderLabel, SliderInput, Slider } from '../styles/SmallSliderToggler'

const CheckboxAndLabelContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  margin: 0.25em 0 0.25em 0.5em;
  p {
    margin-left: 5px;
  }
  input {
    color: ${(props) =>
      props.disabled ? props.theme.disabledText : 'inherit'};
    margin-top: 4px;
  }
`
function CompModeToggler() {
  const { competitionMode, toggleCompetitionMode } = useDisplayControls()
  return (
    <CheckboxAndLabelContainer>
      <SliderLabel id='compModeTogglerLabel' htmlFor='compModeToggler'>
        <SliderInput
          aria-labelledby='compModeTogglerLabel'
          name='compModeToggler'
          id='compModeToggler'
          type='checkbox'
          checked={competitionMode}
          onChange={toggleCompetitionMode}
        />
        <Slider checked={competitionMode}></Slider>
      </SliderLabel>
      <p className='font14'>Competition View</p>
    </CheckboxAndLabelContainer>
  )
}

export default CompModeToggler
