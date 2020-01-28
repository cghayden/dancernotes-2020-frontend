import styled, { keyframes } from "styled-components";

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const Form = styled.form`
   /* each form should be inside a card */
  text-align: center;
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => props.theme.blackText};
  background: ${props => props.theme.gray0};
  /* box-shadow: ${props => props.theme.dropShadow1}; */
  padding: 0 0;
  width: 100%;
  /* min-width: 320px; */
  max-width: 550px;
  margin: 0 auto 1rem auto;
  legend,
  h2 {
    font-size: 1.25em;
    padding: 0.25rem 0;
    margin-bottom: 1rem;
  }

  label {
    margin-bottom: 5px;
    text-align: left;
    &.visuallyHidden {
      display: none;
    }
  }
  input,
  textarea,
  select {
    margin: 0;
    color: ${props => props.theme.indigo9};
    font-size: 1.25rem;
    background-color: ${props => props.theme.blue0};
    border: 1px solid ${props => props.theme.gray2};
  }

  button[type="submit"],
  input[type="submit"] {
    width: 50%;
    max-width: 300px;
    padding: 0.5rem;
    &[aria-busy="true"]::after {
      background-size: 50% auto;
      animation: ${loading} 1s linear infinite;
    }
  }

  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.7;
    }
    &::after {
      height: 2px;
      margin: 4px 0;
      content: "";
      display: block;
      background-image: linear-gradient(
        to right,
        ${props => props.theme.red9} 0%,
        ${props => props.theme.red0} 50%,
        ${props => props.theme.red9} 100%
      );
    }
    &[aria-busy="true"]::after {
      background-size: 50% auto;
      animation: ${loading} 1s linear infinite;
    }
  }
  .time,
  .day {
    width: 110px;
    display: block;
    padding: 0.5rem;
  }
  .fileLoader {
    background: ${props => props.theme.indigo2};
  }
  .input-item {
    display: grid;
    width: 90%;
    margin: 0 auto 1rem auto;
  }
  .form-row {
    margin: 0 auto 1rem auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    .form-row-item {
      display: grid;
      place-content: center;
    }
  }
  .form-footer {
    padding-top: 1rem;
    display: flex;
    justify-content: space-evenly;

  }
`;

const LandingPageForm = styled(Form)`
  border: none;
  background: transparent;
  color: ${props => props.theme.newBlue[0].hsl};

  h2 {
    color: ${props => props.theme.newBlue[0].hsl};
  }
  input {
    background-color: ${props => props.theme.cream};
    color: ${props => props.theme.newBlue[90].hsl};
    font-size: larger;
    display: block;
    margin: 0 auto 1.25rem auto;
  }
  button[type="submit"] {
    width: 80%;
    background-color: ${props => props.theme.newBlue[70].hsl};
    color: ${props => props.theme.newBlue[0].hsl};
    margin: 0 auto 1.25rem auto;
  }
`;

const StyledCreateClassForm = styled(Form)`
  .day {
    text-align: center;
    label {
      display: inline-block;
    }
    input {
      width: 100px;
    }
  }
`;

export default Form;
export { LandingPageForm, StyledCreateClassForm };
