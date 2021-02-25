import styled from 'styled-components'
import SignupParent from './SignupParent'
import SignupStudio from './SignupStudio'

const SignupButton = styled.button`
  font-size: 20px;
  background: ${(props) => props.theme.indigo0};
  color: ${(props) => props.theme.indigo9};
  padding: 20px 30px;
  margin-bottom: 30px;
`

const SignupDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
`

const Signup = ({ view, setView }) => {
  return (
    <SignupDiv>
      <SignupButton onClick={() => setView('signupParent')}>
        I am a Parent
      </SignupButton>
      <SignupButton onClick={() => setView('signupStudio')}>
        I am Studio Owner or Administrator
      </SignupButton>
    </SignupDiv>
  )
}
export default Signup
