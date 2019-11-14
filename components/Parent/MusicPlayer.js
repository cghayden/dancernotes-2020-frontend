import React from "react";
import useMeasure from "../../lib/useMeasure";
import { useSpring, animated } from "react-spring";

const MusicPlayer = ({ src, open }) => {
  const [bind, { height }] = useMeasure();

  const animation = useSpring({
    overflow: "hidden",
    height: open ? height : 0,
  });

  return (
    <animated.div style={animation}>
      <div {...bind}>
        <audio id="musicPlayer" autoPlay={false} controls src={src} />
      </div>
    </animated.div>
  );
};

export default MusicPlayer;
