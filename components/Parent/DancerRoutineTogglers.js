import styled from 'styled-components'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import StudioRoutinesCheckboxes from './StudioRoutinesCheckboxes'
import IndependentRoutinesCheckboxes from './IndependentRoutinesCheckboxes'
import { SliderLabel, SliderInput, Slider } from '../styles/SmallSliderToggler'
import MenuSvg from '../Icons/MenuSvg'
import { useToggle } from '../../utilities/useToggle'

const DancerControlsStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(125px, 1fr));
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
  color: ${(props) =>
    props.disabled ? props.theme.disabledText : props.theme.lighterBlack};
`
const DancerTogglersContainer = styled.div`
  padding: 5px;
  margin-bottom: 8px;
  background: ${(props) => props.theme.gray0};
  transition: all 0.2s;
  border-radius: ${(props) => props.theme.borderRadius};

  @media (min-width: ${(props) => props.theme.mediumScreen}) {
    background: ${(props) =>
      props.isOpen ? props.theme.gray1 : props.theme.gray0};
  }
`
function DancerRoutineTogglers({ dancer, hiddenIds, toggleId }) {
  const { isToggled, toggle } = useToggle(false)

  const allRoutines = [...dancer.danceClasses, ...dancer.customRoutines]
  // dancer.allRoutines = [...dancer.danceClasses, ...dancer.customRoutines]
  const independentRoutines = allRoutines.filter((routine) => !routine.studio)

  return (
    <DancerTogglersContainer isOpen={isToggled}>
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
        <button className='btn-icon' onClick={toggle}>
          <MenuSvg />
        </button>
      </DancerTogglerAndLabel>

      <AnimatePresence>
        {isToggled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.1 } }}
          >
            <DancerControlsStyle key={dancer.id}>
              {!allRoutines.length && (
                <>
                  <Link href='/parent/studios'>
                    <a className='btn-action-primary-textOnly'>Find a Class</a>
                  </Link>
                  <Link href='/parent/routines/addRoutine'>
                    <a className='btn-action-primary-textOnly'>
                      Create a Class
                    </a>
                  </Link>
                </>
              )}
              {dancer.studios &&
                dancer.studios.map((studio) => (
                  <StudioRoutinesCheckboxes
                    allRoutines={allRoutines}
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
    </DancerTogglersContainer>
  )
}

export default DancerRoutineTogglers
