import { useState } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'

const OptionsDiv = styled.div`
  position: relative;
  margin-left: auto;
`

const OptionsButton = styled.button`
  font-size: 2rem;
  background: ${(props) => props.theme.gray0};
  color: ${(props) => props.theme.gray5};
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  display: flex;
  place-items: center;
  justify-content: center;
`

const OptionsLinksContainer = styled(motion.div)`
  position: absolute;
  overflow: hidden;
  background: ${(props) => props.theme.gray0};
  top: 100%;
  right: 0;
  z-index: 1;
  margin: -5px;
  ul {
    padding: 10px;
    a {
      width: max-content;
      color: ${(props) => props.theme.blackText};
    }
  }
`
// ~~~~~~~~~~~~~~~~~~~ CODE ~~~~~~~~~~~~~~~~~~~~~~;
export default function OptionsDropDown() {
  const [options, toggleOptions] = useState(false)
  return (
    <OptionsDiv>
      <OptionsButton
        className='btn-icon'
        onClick={() => toggleOptions(!options)}
      >
        +
      </OptionsButton>
      <AnimatePresence>
        {options && (
          <OptionsLinksContainer
            key={'links'}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
          >
            <ul>
              <li>
                <a href='/studio/createClass'>Add a Dance Class</a>
              </li>
              <li>
                <a href='/studio/createEvent'>Add an Event</a>
              </li>
              <li>
                <a href='/studio/createHairstyle'>Add a Hairstyle</a>
              </li>
              <li>
                <a href='/studio/createMakeup'>Add a Makeup Set</a>
              </li>
              <li>
                <a href='/studio/#createDancer'>Add a Dancer</a>
              </li>
            </ul>
          </OptionsLinksContainer>
        )}
      </AnimatePresence>
    </OptionsDiv>
  )
}
