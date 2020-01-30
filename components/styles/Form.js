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
  width: 100%;
  /* min-width: 320px; */
  max-width: 550px;
  /* margin: 0 auto 1rem auto; */
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
    background: ${props => props.theme.blue0};
    color: ${props => props.theme.indigo9};
    border-radius: 10px;
    font: inherit;
    padding: 0.5rem 1rem;
    margin: 0;
    font-size: 1rem;
    border: 1px solid ${props => props.theme.gray2};
    :focus {
      border-color: ${props => props.theme.teal7};
    }
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

  input[type='checkbox']{
  width: auto;
  margin-right: .5rem;
}
option {
  background: inherit;
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
  .time {
    display: grid;
    grid-template-columns: 110px 110px;
    padding: 0.5rem;
    justify-items: center;

    input{
      width: 100px;
    }
    label {
      display: inline-block;
    }
  }

  .day {
    text-align: center;
    width: 80px;
    display: block;
    padding: 0.5rem;
    select{
      padding: 0;
    }
    label {
      display: inline-block;
    }
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
  .form-row-day-time{
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 0 1rem 0;

  }
  .form-footer {
    padding-top: 1rem;
    display: flex;
    justify-content: space-evenly;

  }
  @media (min-width: ${props => props.theme.largeScreen}) {
    input,
  textarea,
  select {
    padding: 0.5rem;
    font-size: 1.25rem;
  }
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

export default Form;
export { LandingPageForm };
