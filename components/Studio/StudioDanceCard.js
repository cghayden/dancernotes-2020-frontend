import { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Card from '../styles/Card'

import DanceCardHeader from './DanceCardHeader'
import StudioDanceDetails from './StudioDanceDetails'
import MusicPlayer from '../styles/MusicPlayer'
import VideoPlayer from '../styles/VideoPlayer'

const DanceCardStyles = styled(Card)`
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.1),
    -1px -1px 1px 0px rgba(0, 0, 0, 0.02);
`

const DanceCardNav = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 1rem;
`

function StudioDanceCard({ dance }) {
  const [showMediaPlayer, setShowMediaPlayer] = useState(false)
  const [showVideoPlayer, setShowVideoPlayer] = useState(false)

  return (
    <DanceCardStyles>
      <DanceCardHeader dance={dance} />
      <DanceCardNav>
        {dance.videoUrl && (
          <button
            className='btn-action-primary-textOnly'
            onClick={() => setShowVideoPlayer(!showVideoPlayer)}
          >
            Video
          </button>
        )}

        {dance.music && <MusicPlayer src={dance.music} />}
        {showVideoPlayer && <VideoPlayer src={dance.videoUrl} />}

        <Link href={`/studio/updateClass/${dance.id}`}>
          <a className='btn-action-primary-textOnly'>Edit</a>
        </Link>
      </DanceCardNav>
      {showMediaPlayer && <MusicPlayer src={dance.music} />}
      <StudioDanceDetails dance={dance} />
    </DanceCardStyles>
  )
}

export default StudioDanceCard
