import React, { useState } from "react"
import ClientOnlyPortal from "./ClientOnlyPortal"
import { useTransition, animated } from "react-spring"
import styled from "styled-components"

const AnimatedModalContainer = styled(animated.div)`
  background-color: ${(props) => props.theme.gray0};
  position: absolute;
  top: 10%;
  right: 10%;
  bottom: 10%;
  left: 10%;
  padding: 1em;
  text-align: center;

  @media (min-width: ${(props) => props.theme.largeScreen}) {
    left: 3%;
    right: 3%;
    padding: 0.5rem;
  }
`

const ModalBackdrop = styled(animated.div)`
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
  const transition = useTransition(open, null, {
    from: { opacity: 0, transform: "translate3d(-1000px, 0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(-1000px, 0, 0)" },
  })

  return (
    <div>
      {open && (
        <ClientOnlyPortal selector="#modal">
          {transition.map(
            ({ item, key, props: animation }) =>
              item && (
                <ModalBackdrop key={key} style={animation}>
                  <AnimatedModalContainer>{children}</AnimatedModalContainer>
                </ModalBackdrop>
              )
          )}
        </ClientOnlyPortal>
      )}
    </div>
  )
}
