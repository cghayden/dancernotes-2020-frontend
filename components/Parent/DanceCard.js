import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import useMeasure from "../../lib/useMeasure";
import Card from "../styles/Card";
import DanceCardBody from "./DanceCardBody";
import DanceCardHeader from "./DanceCardHeader";
import MusicPlayer from "./MusicPlayer";

const DanceCardStyles = styled(Card)`
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.1),
    -1px -1px 1px 0px rgba(0, 0, 0, 0.02);
  img {
    margin: 0;
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
      <DanceCardHeader dance={dance} visibleDancersIds={visibleDancersIds} />
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
