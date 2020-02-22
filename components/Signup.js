import styled from "styled-components";

const SignupButton = styled.button`
  font-size: 20px;
  background: ${props => props.theme.indigo0};
  color: ${props => props.theme.indigo9};
  padding: 20px 30px;
  margin-bottom: 30px;
`;

const SignupDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
`;

const Signup = ({ setActive }) => {
  return (
    <SignupDiv>
      <SignupButton onClick={() => setActive("signupParent")}>
        Sign up as a Parent
      </SignupButton>
      <SignupButton onClick={() => setActive("signupStudio")}>
        Sign up as a Studio
      </SignupButton>
    </SignupDiv>
  );
};
export default Signup;
