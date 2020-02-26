import { useState } from "react";
import styled from "styled-components";

const SliderInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;
const SliderLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 28px;
  p {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
`;
const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  border-radius: 34px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props =>
    props.checked ? props.theme.green4 : props.theme.gray2};
  -webkit-transition: 0.4s;
  transition: 0.4s;

  :before {
    position: absolute;
    border-radius: 50%;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: ${props =>
      props.checked ? props.theme.gray0 : props.theme.gray0};
    transition: 0.2s;
    transform: ${props =>
      props.checked ? `translateX(20px)` : `translateX(0px)`};
  }
`;

function SliderToggler() {
  const [compMode, toggleCompMode] = useState(false);
  return (
    <SliderLabel id="compModeToggerLabel" htmlFor="compModeToggler">
      <p>Competition Mode:</p>
      <SliderInput
        aria-labelledby="compModeToggerLabel"
        name="compModeToggler"
        id="compModeToggler"
        type="checkbox"
        checked={compMode}
        onChange={() => toggleCompMode(compMode => !compMode)}
      />
      <Slider checked={compMode}></Slider>
    </SliderLabel>
  );
}

export default SliderToggler;
