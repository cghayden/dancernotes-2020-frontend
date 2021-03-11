import styled, { keyframes } from 'styled-components'

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`

const Form = styled.form`
  /* each form should be inside a card */
  input[type='time'] {
    width: 115px;
  }
  text-align: center;
  border-radius: ${(props) => props.theme.borderRadius};
  background: ${(props) => props.theme.gray0};
  width: 100%;
  max-width: 550px;
  .form-section {
    padding: 0.5rem 0;
  }
  .datePicker {
    margin-bottom: 0.5rem;
  }
  #endDate,
  #beginDate {
    width: 115px;
  }
  legend,
  h2 {
    font-size: 1.1em;
  }
  legend,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 0.5rem 0;
  }

  label {
    margin-bottom: 2px;
    text-align: left;
    &.visuallyHidden {
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }
  }
  input,
  textarea,
  select {
    background: white;
    color: ${(props) => props.theme.indigo9};
    border-radius: 10px;
    font: inherit;
    padding: 0.25rem 0.5rem;
    margin: 0;
    font-size: 1rem;
    border: 1px solid ${(props) => props.theme.gray2};
    :focus {
      border-color: ${(props) => props.theme.teal7};
    }
  }

  button[type='submit'],
  input[type='submit'] {
    /* width: 50%; */
    flex-grow: 1;
    max-width: 300px;
    padding: 0.5rem;
    &[aria-busy='true']::after {
      background-size: 50% auto;
      animation: ${loading} 1s linear infinite;
    }
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
    &[aria-busy='true']::after {
      height: 2px;
      margin: 4px 0;
      content: '';
      display: block;
      background-image: linear-gradient(
        to right,
        ${(props) => props.theme.red9} 0%,
        ${(props) => props.theme.red0} 50%,
        ${(props) => props.theme.red9} 100%
      );
      background-size: 50% auto;
      animation: ${loading} 1s linear infinite;
    }
  }
  /* .time {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    justify-content: center;
    margin-bottom: 12px;

    input {
      width: 140px;
      padding-top: 6px;
      padding-bottom: 6px;
    }
    label {
      margin-right: 10px;
    }
  } */
  .input-item {
    display: grid;
    width: 90%;
    margin: 0 auto 12px auto;
  }
  .day {
    text-align: center;
    width: 70px;
    justify-content: center;
    align-items: center;
    select {
      padding-left: 0;
      width: 70px;
    }
    label {
      display: inline-block;
      margin-right: 10px;
    }
  }
  .time {
    width: auto;
  }
  .fileLoader {
    background: ${(props) => props.theme.indigo2};
  }
  .form-row {
    margin: 0 auto 4px auto;
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .row-item {
      display: grid;
      width: auto;
      margin: 0 auto 12px auto;
    }
    .form-row-item {
      display: grid;
      place-content: center;
      margin-bottom: 12px;
      #entryNumber {
        width: 70px;
      }
    }
  }
  .form-row-day-time {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 0 1rem 0;
  }

  .state {
    width: 80px;
  }

  .zip {
    width: 100px;
  }
  .form-footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    a,
    button {
      margin: 0.5rem;
    }
  }

  @media (min-width: ${(props) => props.theme.largeScreen}) {
    input,
    textarea,
    select {
      padding: 0.5rem;
    }
  }
  .required {
    font-size: 12px;
    color: ${(props) => props.theme.red7};
    padding: 0 8px;
  }
  ul.selectChoices {
    margin-bottom: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: row;
  }
`

const LandingPageForm = styled(Form)`
  border: none;
  background: transparent;
  max-width: 330px;
  h2 {
    color: ${(props) => props.theme.indigo8};
  }
  input {
    font-size: larger;
    display: block;
    margin: 0 auto 1.25rem auto;
  }
`

export default Form
export { LandingPageForm }
