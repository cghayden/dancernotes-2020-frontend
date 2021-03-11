import styled from 'styled-components'

const SliderInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`
const SliderLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 28px;
  height: 16px;
  margin-top: 4px;
`
const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  border-radius: 34px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) =>
    props.checked ? props.theme.dutchRed : props.theme.gray2};
  -webkit-transition: 0.4s;
  transition: 0.4s;

  :before {
    position: absolute;
    border-radius: 50%;
    content: '';
    height: 14px;
    width: 14px;
    left: 1px;
    bottom: 1px;
    background-color: ${(props) =>
      props.checked ? props.theme.gray0 : props.theme.gray0};
    transition: 0.2s;
    transform: ${(props) =>
      props.checked ? `translateX(12px)` : `translateX(0px)`};
  }
`

function SmallSliderToggler() {
  return (
    <SliderLabel id='compModeToggler-label' htmlFor='compModeToggler'>
      <SliderInput
        aria-labelledby='compModeToggler-label'
        name='compMode-toggler'
        id='compMode-toggler'
        type='checkbox'
      />
      <Slider checked={competitionMode}></Slider>
    </SliderLabel>
  )
}

export { SliderLabel, SliderInput, Slider }
