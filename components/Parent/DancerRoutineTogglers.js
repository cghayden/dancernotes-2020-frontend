import { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

import DancerToggler from './DancerToggler'
import StudioRoutinesCheckboxes from './StudioRoutinesCheckboxes'
import IndependentRoutinesCheckboxes from './IndependentRoutinesCheckboxes'
import { SliderLabel, SliderInput, Slider } from '../styles/SmallSliderToggler'
import MenuSvg from '../Icons/MenuSvg'

const DancerControlsStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  padding-top: 0.5rem;
  /* background-color: ${(props) => props.theme.gray1}; */
  /* border-radius: 5px; */
  /* padding-bottom: 1rem; */
  /* padding-right: 1rem; */
  /* padding-left: 1rem; */
  /* margin-bottom: 1rem; */
  /* box-shadow: ${(props) => props.theme.dropShadow1}; */
  /* input[type='checkbox'] {
    margin-right: 0.5rem;
  } */
`
const DancerTogglerAndLabel = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  margin: 0.25em 0 0.25em 0.5em;
  input {
    color: ${(props) =>
      props.disabled ? props.theme.disabledText : 'inherit'};
    margin-top: 4px;
  }
  button {
    padding: 0;
    justify-self: right;
  }
`
const TogglerLabel = styled.label`
  font-size: 18px;
  padding-left: 0.5rem;
  font-weight: 600;
  color: ${(props) => (props.disabled ? props.theme.disabledText : 'inherit')};
`
function DisplayController({ dancer, hiddenIds, toggleId }) {
  const [isOpen, toggleIsOpen] = useState(false)

  dancer.allRoutines = [...dancer.danceClasses, ...dancer.customRoutines]
  const independentRoutines = dancer.allRoutines.filter(
    (routine) => !routine.studio
  )

  return (
    <div>
      <DancerTogglerAndLabel key={dancer.id}>
        <SliderLabel
          id={`${dancer.firstName}-label`}
          htmlFor={`${dancer.firstName}-toggler`}
        >
          <SliderInput
            aria-labelledby={`${dancer.firstName}-label`}
            name={`${dancer.firstName}-toggler`}
            id={`${dancer.firstName}-toggler`}
            type='checkbox'
            checked={!hiddenIds.includes(dancer.id)}
            onChange={() => toggleId(dancer.id)}
          />
          <Slider checked={!hiddenIds.includes(dancer.id)}></Slider>
        </SliderLabel>

        <TogglerLabel>{dancer.firstName}</TogglerLabel>
        <button
          className='btn-icon'
          onClick={() => toggleIsOpen((isOpen) => !isOpen)}
        >
          <MenuSvg />
        </button>
      </DancerTogglerAndLabel>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.1 } }}
            // ref={dropDownRef}
          >
            <DancerControlsStyle key={dancer.id}>
              {!dancer.allRoutines.length && (
                <Link href='/parent/account/dancers'>
                  <a className='btn-action-primary-textOnly'>
                    Create or Find a Class
                  </a>
                </Link>
              )}
              {dancer.studios &&
                dancer.studios.map((studio) => (
                  <StudioRoutinesCheckboxes
                    allRoutines={dancer.allRoutines}
                    studioName={studio.studioName}
                    studioId={studio.id}
                    key={studio.id}
                    dancerId={dancer.id}
                  />
                ))}

              {independentRoutines.length > 0 && (
                <IndependentRoutinesCheckboxes
                  dancerId={dancer.id}
                  routines={independentRoutines}
                />
              )}
            </DancerControlsStyle>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DisplayController
