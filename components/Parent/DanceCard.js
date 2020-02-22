import React, { useState, Fragment } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import useMeasure from "../../lib/useMeasure";
import Card from "../styles/Card";
import EnrolledDancers from "./EnrolledDancers";
import DanceCardBody from "./DanceCardBody";
import MusicPlayer from "./MusicPlayer";

const DanceCardStyles = styled(Card)`
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.1),
    -1px -1px 1px 0px rgba(0, 0, 0, 0.02);
  img {
    margin: 0;
  }
`;

const DanceCardHeader = styled.div`
  display: grid;
  grid-template-columns: 33% 1fr 50px;
  align-items: center;
  ul {
    display: flex;
    li {
      padding: 0 5px;
    }
  }
`;
const DanceCardTitle = styled.div`
  font-size: 0.875rem;
  grid-column: 1 / -1;
  grid-row: 1;
  p:first-child {
    font-weight: 600;
    font-size: larger;
  }
  p:last-child {
    font-style: italic;
  }
  @media (min-width: ${props => props.theme.largeScreen}) {
    font-size: 1rem;
  }
`;

const DanceCardTime = styled.div`
  font-size: 0.675rem;
  grid-column: 3/-1;
  grid-row: 1;

  @media (min-width: ${props => props.theme.largeScreen}) {
    font-size: 0.825rem;
  }
`;

const DanceCardNav = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 0.825rem;
  a,
  button {
    border-radius: 0;
    margin: 0;
    &:hover,
    &:focus {
      color: ${props => props.theme.indigo8};
      background: none;
      outline: none;
      border-bottom: 2px solid ${props => props.theme.indigo8};
      margin-bottom: -2px;
    }
  }
`;

function DanceCard({ dance, visibleDancersIds }) {
  const [showBody, setShowBody] = useState(false);
  const [showMediaPlayer, setShowMediaPlayer] = useState(false);
  const [bind, { height }] = useMeasure();

  const animation = useSpring({
    overflow: "hidden",
    height: showBody ? height : 0
  });

  function toggleBody() {
    setShowBody(!showBody);
  }

  return (
    <DanceCardStyles>
      <DanceCardHeader>
        <EnrolledDancers
          visibleDancersIds={visibleDancersIds}
          dancers={dance.dancers}
        />
        <DanceCardTitle>
          <p>{dance.name}</p>
          <p>{dance.performanceName}</p>
        </DanceCardTitle>
        <DanceCardTime>
          <p>{dance.day}</p>
          <p>{dance.startTime}</p>
        </DanceCardTime>
      </DanceCardHeader>
      <DanceCardNav>
        <button className="textOnly-primary-action" onClick={toggleBody}>
          Details
        </button>
        <button
          className="textOnly-primary-action"
          onClick={() => setShowMediaPlayer(!showMediaPlayer)}
        >
          Music
        </button>
        {dance.custom && (
          <Link href={`/parent/updateDance/${dance.id}`}>
            <a className="textOnly-primary-action">Edit</a>
          </Link>
        )}
      </DanceCardNav>

      {showMediaPlayer && (
        <MusicPlayer danceName={dance.name} src={dance.music} />
      )}

      <animated.div style={animation}>
        <div {...bind}>
          <DanceCardBody dance={dance} />
        </div>
      </animated.div>
    </DanceCardStyles>
  );
}

export default DanceCard;

// const AnimationStyles = styled.span`
//   position: relative;
//   .element {
//     display: block;
//   }
//   .element-enter {
//     opacity: 0.01;
//     transform: translateY(-100%) scale(0.1);
//   }
//   .element-enter-active {
//     opacity: 0.5;
//     transform: translateY(0%) scale(0.9);
//     transition: all 300ms ease-in-out;
//     /* transition: all 300ms cubic-bezier(0.6, -0.28, 0.735, 0.045); */
//   }
//   .element-exit {
//     opacity: 0.3;
//     transform: translateY(-1%) scale(0.9);
//   }
//   .element-exit-active {
//     opacity: 0.01;
//     transform: translateY(-100%) scale(0.1);
//     transition: all 300ms ease-in-out;
//     /* transition: all 0.6s cubic-bezier(0.6, -0.28, 0.735, 0.045); */
//   }
// `;
