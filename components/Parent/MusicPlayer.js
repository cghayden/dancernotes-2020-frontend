import React from "react";
import useMeasure from "../../lib/useMeasure";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

const MusicPlayer = ({ src, open }) => {
  const [bind, { height }] = useMeasure();

  const animation = useSpring({
    overflow: "hidden",
    height: open ? height : 0
  });

  const AudioPlayer = styled.audio`
    /* color: blue; */
    /* &:-webkit-media-controls-panel {
      color: blue;
    } */
  `;

  return (
    <animated.div style={animation}>
      <div {...bind}>
        <AudioPlayer id="musicPlayer" autoPlay={false} controls src={src} />
      </div>
    </animated.div>
  );
};

export default MusicPlayer;
