import React, { useState } from "react";
import styled from "styled-components";

const VideoWindow = styled.video`
  display: block;
  width: 100%;
`;

const VideoPlayer = ({ src }) => {
  const [error, setError] = useState(false);
  if (src) {
    return (
      <>
        {error && <p>Error!{error}</p>}
        <VideoWindow
          preload="none"
          controls
          src={src}
          onError={() => setError(true)}
        />
      </>
    );
  }
  return <p className="py1">Video is unavailable</p>;
};

export default VideoPlayer;
