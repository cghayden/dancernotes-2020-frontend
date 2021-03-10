import { AboutUl } from './styles/AboutStyles'
import styled from 'styled-components'
import Card from './styles/Card'
import ParentDemoVideo from './Parent/ParentVideo'

const PageSignInStyle = styled.div`
  height: 50px;
  display: grid;
  place-items: center;
`
const MessageDiv = styled.div`
  /* width: 90%; */
  text-align: center;
  padding: 0em 1em 1em 1em;
  p {
    font-size: 14px;
    margin: 0px 1rem 0 1rem;
    color: ${(props) => props.theme.indigo8};
  }
`

const messages = [
  `All of your dancers' information, from all of their studios, in one
place`,
  `Keep your own dance notes if a studio is not using Dancer Notes`,
]

const AboutParent = ({ setView }) => {
  return (
    <div>
      <MessageDiv>
        <p>All of your dancers' and studios' necessities, all in one place</p>
      </MessageDiv>
      <ParentDemoVideo
        src={
          'https://res.cloudinary.com/coreytesting/video/upload/v1614995972/DemoVideos/ParentDemoVideo1.mp4'
        }
      />
      {/* <AboutUl>
          <li>
            All of your dancers' information, from all of their studios, in one
            place.
          </li>
          <li>
            Keep your own dance notes if your studio is not using Dancer Notes
            studio.
          </li>
          <li>Find studios, retailers, and opportunities for your dancers!</li>
        </AboutUl> */}
    </div>
  )
}

export default AboutParent
//  <button
//         type='button'
//         className='btn-action-primary'
//         onClick={() => setView('signupParent')}
//       >
//         Try Dancer Notes for Free
//       </button>
//       <PageSignInStyle>
//         <button
//           className='btn-action-primary-textOnly btn-small'
//           onClick={() => setView('signin')}
//         >
//           Sign In To Your Dancer Notes
//         </button>
//       </PageSignInStyle>
