import { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Card from '../styles/Card'
import DanceCardBody from './DanceCardBody'
import DanceCardHeader from './DanceCardHeader'
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
  a,
  button {
    border-radius: 0;
    margin: 0;
    &:hover,
    &:focus {
      color: ${(props) => props.theme.indigo8};
      background: none;
      outline: none;
      border-bottom: 2px solid ${(props) => props.theme.indigo8};
      margin-bottom: -2px;
    }
  }
`
function ParentDanceCard({ dance }) {
  const [showMediaPlayer, setShowMediaPlayer] = useState(false)
  const [showVideoPlayer, setShowVideoPlayer] = useState(false)
  //dancers
  //name
  //perf name
  // if custom ? edit
  // if custom ? music ? show player : add music button
  // shoes
  //toights
  //studio notes
  // custom ? notes
  //parent notes ? parent notes
  //add parent note option
  // comp entry info ? show comp info
  //custom ? add comp info button
  return (
    <DanceCardStyles>
      <DanceCardHeader dance={dance} />
      <DanceCardNav>
        {/* <button
          className='btn-action-primary-textOnly'
          onClick={() => setShowMediaPlayer(!showMediaPlayer)}
        >
          Music
        </button> */}
        {dance.videoUrl && (
          <button
            className='btn-action-primary-textOnly'
            onClick={() => setShowVideoPlayer(!showVideoPlayer)}
          >
            Video
          </button>
        )}
        {dance.custom && !dance.music && (
          <button className='btn-action-primary-textOnly'>Upload Music</button>
        )}
        {dance.custom && (
          <Link href={`/parent/updateDance/${dance.id}`}>
            <a className='btn-action-primary-textOnly'>Edit</a>
          </Link>
        )}
      </DanceCardNav>

      {dance.music && <MusicPlayer src={dance.music} />}

      {showVideoPlayer && <VideoPlayer src={dance.videoUrl} />}

      <DanceCardBody dance={dance} />
    </DanceCardStyles>
  )
}

export default ParentDanceCard
