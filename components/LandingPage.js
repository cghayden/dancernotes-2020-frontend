import LandingNav from "./LandingNav";
import styled from "styled-components";
import React, { useState } from "react";
import About from "./About";
import Signup from "./Signup";
import Signin from "./Signin";
import AboutParent from "./AboutParent";
import SignupParent from "./SignupParent";
import AboutStudio from "./AboutStudio";
import SignupStudio from "./SignupStudio";
import AboutRetail from "./AboutRetail";
import SignupRetail from "./SignupRetail";
import { animated, useTransition } from "react-spring";

const StyledLandingPage = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: min-content auto;
  color: white;
  background: linear-gradient(
    to bottom right,
    ${props => props.theme.newBlue[60].hsl},
    ${props => props.theme.newBlue[50].hsl}
  );
`;

const StyledLandingContent = styled.div`
  display: grid;
  justify-items: center;
  position: relative;
`;

const AboutContent = styled(animated.div)`
  padding: 2rem;
  text-align: center;
`;
function LandingPage() {
  const [active, setActive] = useState("about");

  const transitions = useTransition(active, null, {
    from: {
      position: "absolute",
      opacity: 0,
      transform: "translate3d(100%, 0,0)",
    },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-100%, 0,0)" },
  });
  return (
    <StyledLandingPage>
      <LandingNav setActive={setActive} />
      <StyledLandingContent>
        {transitions.map(({ item, key, props }) => {
          switch (item) {
            case "about":
              return (
                <animated.div key={key} style={props}>
                  <About />
                </animated.div>
              );
            case "signin":
              return (
                <animated.div key={key} style={props}>
                  <Signin />
                </animated.div>
              );
            case "signup":
              return (
                <animated.div key={key} style={props}>
                  <Signup setActive={setActive} />
                </animated.div>
              );
            case "aboutParent":
              return (
                <AboutContent key={key} style={props}>
                  <AboutParent setActive={setActive} />
                </AboutContent>
              );
            case "signupParent":
              return (
                <animated.div key={key} style={props}>
                  <SignupParent />
                </animated.div>
              );
            case "aboutStudio":
              return (
                <AboutContent key={key} style={props}>
                  <AboutStudio setActive={setActive} />
                </AboutContent>
              );
            case "signupStudio":
              return (
                <animated.div key={key} style={props}>
                  <SignupStudio />
                </animated.div>
              );
            case "aboutRetail":
              return (
                <AboutContent key={key} style={props}>
                  <AboutRetail setActive={setActive} />
                </AboutContent>
              );
            case "signupRetail":
              return (
                <animated.div key={key} style={props}>
                  <SignupRetail />
                </animated.div>
              );

            default:
              return (
                <animated.div key={key} style={transition}>
                  <About />
                </animated.div>
              );
          }
        })}
      </StyledLandingContent>
    </StyledLandingPage>
  );
}

export default LandingPage;
export { StyledLandingContent };
