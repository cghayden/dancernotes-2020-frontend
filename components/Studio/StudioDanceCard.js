import { useState, Fragment } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useSpring, animated } from "react-spring";
import useMeasure from "../../lib/useMeasure";
import Card from "../styles/Card";
import DanceCardHeader from "./DanceCardHeader";
import StudioDanceDetails from "./StudioDanceDetails";
import MusicPlayer from "../Parent/MusicPlayer";

const DanceCardStyles = styled(Card)`
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.1),
    -1px -1px 1px 0px rgba(0, 0, 0, 0.02);
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
    <DanceCardStyles>
      <DanceCardHeader dance={dance} setShowBody={setShowBody} />
      <DanceCardNav>
        <button className="btn-action-primary-textOnly" onClick={toggleBody}>
          Details
        </button>
        <button
          className="btn-action-primary-textOnly"
          onClick={() => setShowMediaPlayer(!showMediaPlayer)}
        >
          Music
        </button>
        <Link href={`/studio/updateClass/${dance.id}`}>
          <a className="btn-action-primary-textOnly">Edit</a>
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
  );
}

export default StudioDanceCard;
