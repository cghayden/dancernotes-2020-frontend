import React, { useState } from "react";

const MusicPlayer = ({ src }) => {
  const [error, setError] = useState(false);
  if (src) {
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
  }
  return <p className="py1">Music is unavailable</p>;
};

export default MusicPlayer;
