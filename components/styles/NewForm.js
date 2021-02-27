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
  text-align: center;
  border-radius: ${(props) => props.theme.borderRadius};
  /* color: ${(props) => props.theme.blackText}; */
  background: ${(props) => props.theme.gray0};
  width: 100%;
  max-width: 550px;
  .datePicker {
    margin-bottom: 0.5rem;
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
  .inputItem {
    text-align: left;
    display: flex;
    flex-direction: column;
    label {
      margin-bottom: 2px;
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
  .time {
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* padding: 0.5rem; */
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
  }

  .day {
    margin: 5px 0;
    text-align: center;
    display: flex;
    /* padding: 0.5rem; */
    justify-content: center;
    align-items: center;
    select {
      padding-left: 0;
      width: 100px;
    }
    label {
      display: inline-block;
      margin-right: 10px;
    }
  }

  .fileLoader {
    background: ${(props) => props.theme.indigo2};
  }
  input {
    width: 100%;
  }

  .form-row {
    margin: 0 auto 8px auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 16px;
  }
  .form-span1 {
    grid-column: span 1;
  }
  .form-span2 {
    grid-column: span 2;
  }
  .form-span3 {
    grid-column: span 3;
  }
  .form-span4 {
    grid-column: span 4;
  }
  .form-c1 {
    grid-column: 1;
  }
  .form-c2 {
    grid-column: 2;
  }
  .form-c3 {
    grid-column: 3;
  }
  .form-c2-2 {
    grid-column: 2 / span 2;
  }
  .form-c-full {
    grid-column: 1/-1;
  }
  textarea {
    width: 100%;
  }
  #entryNumber {
    width: 70px;
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
    padding-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
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
