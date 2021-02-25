import Router from 'next/router'
import gql from 'graphql-tag'
import { LandingPageForm } from './styles/Form'
import Error from './Error'
import styled from 'styled-components'
import useForm from '../utilities/useForm'
import { useMutation } from 'react-apollo'

const SIGNUP_STUDIO_MUTATION = gql`
  mutation SIGNUP_STUDIO_MUTATION(
    $email: String!
    $studioName: String!
    $userType: String!
    $password: String!
    $agreedToTermsAndPrivacy: DateTime!
  ) {
    signupStudio(
      email: $email
      studioName: $studioName
      userType: $userType
      password: $password
      agreedToTermsAndPrivacy: $agreedToTermsAndPrivacy
    ) {
      id
      email
      studioName
    }
  }
`
const Terms = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
  a {
    display: inline-block;
    padding: 0 5px;
    margin: 0;
    text-decoration: underline;
    text-transform: uppercase;
    min-width: initial;
  }
`

const initialInputState = {
  studioName: '',
  password: '',
  email: '',
  userType: 'studio',
}

function StudioSignup() {
  const { inputs, handleChange, resetForm } = useForm(initialInputState)

  const [signupStudio, { data, loading, error }] = useMutation(
    SIGNUP_STUDIO_MUTATION,
    {
      variables: { ...inputs, agreedToTermsAndPrivacy: new Date(Date.now()) },
      onCompleted: (data) => {
        Router.push({
          pathname: '/studio',
        })
      },
    }
  )

  return (
    <LandingPageForm
      method='post'
      onSubmit={async (e) => {
        e.preventDefault()
        await signupStudio()
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <div className='form-header'>
          <h2>Sign Up for A Studio Account</h2>
        </div>
        <div className='form-content'>
          <Error error={error} />
          <label htmlFor='email' className='visuallyHidden'>
            Email
          </label>
          <input
            type='email'
            name='email'
            placeholder='email'
            value={inputs.email}
            onChange={handleChange}
          />
          <label htmlFor='studioName' className='visuallyHidden'>
            Studio Name
          </label>
          <input
            type='text'
            name='studioName'
            placeholder='Studio Name'
            value={inputs.studioName}
            onChange={handleChange}
          />
          <label htmlFor='password' className='visuallyHidden'>
            Password
          </label>
          <input
            type='password'
            name='password'
            placeholder='password'
            value={inputs.password}
            onChange={handleChange}
          />
        </div>
        <Terms>
          <p>
            By signing up, you agree to our
            <a
              rel='noreferrer noopener'
              target='_blank'
              href='https://www.websitepolicies.com/policies/view/Xd9syaYo'
            >
              Terms
            </a>
            and
            <a
              rel='noreferrer noopener'
              target='_blank'
              href='https://www.websitepolicies.com/policies/view/Xd9syaYo'
            >
              Privacy Policy
            </a>
          </p>
        </Terms>
        <button type='submit' className='btn-action-primary'>
          Sign Up
        </button>
      </fieldset>
    </LandingPageForm>
  )
}

export default StudioSignup
