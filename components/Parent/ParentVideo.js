import { useState } from 'react'
import styled from 'styled-components'
import Error from '../Error'

const VideoWindow = styled.video`
  display: block;
  width: 64%;
  margin: 0 auto;
  max-width: 320px;
`

const ParentDemoVideo = ({ src }) => {
  const [error, setError] = useState(false)
  if (src) {
    return (
      <>
        {error && <Error error={error} />}
        <VideoWindow
          loop={true}
          playsInline={true}
          type='video/'
          autoPlay={true}
          //   preload='none'
          src={src}
          onError={() => setError(true)}
        />
      </>
    )
  }
  return null
}

export default ParentDemoVideo
