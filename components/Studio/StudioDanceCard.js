import React, { useState, Fragment } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useSpring, animated } from "react-spring";
import useMeasure from "../../lib/useMeasure";
import Card from "../styles/Card";
// import Modal from "../Modal";
import DanceCardHeader from "./DanceCardHeader";
import StudioDanceDetails from "./StudioDanceDetails";
import MusicPlayer from "../Parent/MusicPlayer";

const DanceCardStyles = styled(Card)`
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.1),
    -1px -1px 1px 0px rgba(0, 0, 0, 0.02);
`;

// const DanceCardHeader = styled.div`
//   display: grid;
//   grid-template-columns: 33% 1fr 50px;
//   align-items: center;
//   ul {
//     display: flex;
//     li {
//       padding: 0 5px;
//     }
//   }
// `;
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
`;

function StudioDanceCard({ dance }) {
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
    <Fragment>
      <DanceCardStyles>
        <DanceCardHeader dance={dance} setShowBody={setShowBody} />
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
          <Link href={`/studio/updateClass/${dance.id}`}>
            <a className="textOnly-primary-action">Edit</a>
          </Link>
        </DanceCardNav>
        {showMediaPlayer && (
          <MusicPlayer danceName={dance.name} src={dance.music} />
        )}
        <animated.div style={animation}>
          <div {...bind}>
            <StudioDanceDetails dance={dance} />
          </div>
        </animated.div>
      </DanceCardStyles>
      {/* <Modal open={showDetails} setOpen={toggleShowDetails}>
        
        <button onClick={() => toggleShowDetails(false)}>Close</button>
      </Modal> */}
    </Fragment>
  );
}

export default StudioDanceCard;
