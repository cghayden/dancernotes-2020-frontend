import React, { useState } from "react";

const MusicPlayer = ({ src }) => {
  const [error, setError] = useState(false);
  return (
    <>
      {error && <p>Error!{error}</p>}
      <audio
        preload="none"
        id="musicPlayer"
        autoPlay={false}
        controls
        src={src}
        onerror={() => setError(true)}
      />
    </>
  );
};

export default MusicPlayer;
