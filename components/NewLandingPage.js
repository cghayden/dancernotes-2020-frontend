import LandingNav from './LandingNav'
import styled from 'styled-components'
import { useState } from 'react'
import Signin from './Signin'
import Signup from './Signup'
import About from './About'
import SignupParent from './SignupParent'
import SignupStudio from './SignupStudio'
import RequestResetPassword from './RequestResetPassword'

const StyledLandingPage = styled.div`
  display: grid;
  grid-template-rows: min-content auto;
`

const StyledLandingContent = styled.div`
  display: grid;
  justify-items: center;
  position: relative;
  grid-gap: 20px;
  padding-top: 20px;
  margin: 0 auto;
  width: 80%;
  max-width: 600px;
`

function LandingPage() {
  const [view, setView] = useState('aboutParent')

  return (
    <StyledLandingPage>
      <LandingNav setView={setView} />
      {/* about content here, brief about for each cartegory, with a link to more detailed about for specific category */}
      <StyledLandingContent>
        {view.slice(0, 5) === 'about' && (
          <About view={view} setView={setView} />
        )}
        {view === 'signin' && <Signin setView={setView} />}
        {view === 'signup' && <Signup view={view} setView={setView} />}
        {view === 'signupParent' && <SignupParent />}
        {view === 'signupStudio' && <SignupStudio />}
        {view == 'requestPassword' && <RequestResetPassword />}
      </StyledLandingContent>
    </StyledLandingPage>
  )
}

export default LandingPage
export { StyledLandingPage, StyledLandingContent }
