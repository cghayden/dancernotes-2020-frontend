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
  grid-template-rows: 1fr 8fr 1fr 1fr;
  height: 100vh;
`

const StyledLandingContent = styled.div`
  /* grid-gap: 20px; */
  /* padding-top: 30px; */
  margin: 0 auto;
`
const PageSignInStyle = styled.div`
  height: 50px;
  display: grid;
  place-items: center;
`
const LoginButtonsDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  button {
    margin: 0;
  }
`
const FooterStyle = styled.footer`
  position: fixed;
  bottom: 0;
  height: 40px;
  width: 100%;
  text-align: center;
  width: 100%;
  align-items: flex-end;
  grid-row: 4/-1;
  a {
    padding: 0;
    margin: 0;
  }
  place-self: center;
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
      {view === 'about' ||
        (view === 'aboutParent' && (
          <LoginButtonsDiv>
            <button
              className='btn-action-primary btn-small'
              onClick={() => setView('signin')}
            >
              Sign In
            </button>
            <button
              className='btn-action-secondary btn-small'
              onClick={() => setView('signup')}
            >
              Try It!
            </button>
          </LoginButtonsDiv>
        ))}
      <FooterStyle>
        <p>
          <span>
            <a
              className='btn-action-primary-textOnly'
              href='mailto:cghayden@gmail.com'
            >
              cghayden@gmail.com
            </a>
          </span>
        </p>
      </FooterStyle>
    </StyledLandingPage>
  )
}

export default LandingPage
export { StyledLandingPage, StyledLandingContent }
