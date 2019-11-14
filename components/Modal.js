import React, { useState } from "react";
import ClientOnlyPortal from "./ClientOnlyPortal";
import { useTransition, animated } from "react-spring";
import styled from "styled-components";

const AnimatedModalContainer = styled(animated.div)`
  background-color: ${props => props.theme.gray0};
  position: absolute;
  top: 10%;
  right: 10%;
  bottom: 10%;
  left: 10%;
  padding: 1em;

  @media (max-width: ${props => props.theme.largeScreen}) {
    left: 3%;
    right: 3%;
    padding: 0.5rem;
  }
`;

export default function Modal({ children, open, setOpen }) {
  // const [open, setOpen] = useState(false);

  const transition = useTransition(open, null, {
    from: { opacity: 0, transform: "translate3d(-1000px, 0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(-1000px, 0, 0)" },
  });

  return (
    <div>
      {open && (
        <ClientOnlyPortal selector="#modal">
          {transition.map(
            ({ item, key, props: animation }) =>
              item && (
                <animated.div className="modal-backdrop" style={animation}>
                  <AnimatedModalContainer>
                    {children}
                    <button type="button" onClick={() => setOpen(false)}>
                      Close Modal
                    </button>
                  </AnimatedModalContainer>
                </animated.div>
              ),
          )}
        </ClientOnlyPortal>
      )}
    </div>
  );
}
