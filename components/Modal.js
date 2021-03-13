import ClientOnlyPortal from './ClientOnlyPortal'
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'

const AnimatedModalContainer = styled.div`
  background-color: ${(props) => props.theme.gray0};
  position: absolute;
  top: 10%;
  right: 10%;
  bottom: 10%;
  left: 10%;
  padding: 1em;
  text-align: center;
  .modal-options {
    margin-top: 2rem;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    :no-button,
    a {
      margin: 1rem;
    }
  }
  @media (min-width: ${(props) => props.theme.largeScreen}) {
    left: 3%;
    right: 3%;
    padding: 0.5rem;
  }
`

const ModalBackdrop = styled(motion.div)`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  top: 9rem;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  @media (min-width: ${(props) => props.theme.largeScreen}) {
    margin-top: ${(props) => props.theme.navHeight};
    margin-left: 18vw;
  }
`

export default function Modal({ children, open }) {
  return (
    <div>
      {open && (
        <ClientOnlyPortal selector='#modal'>
          <AnimatePresence>
            <ModalBackdrop
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AnimatedModalContainer>{children}</AnimatedModalContainer>
            </ModalBackdrop>
          </AnimatePresence>
        </ClientOnlyPortal>
      )}
    </div>
  )
}
