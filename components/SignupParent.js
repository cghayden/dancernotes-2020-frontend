import Router from 'next/router'
import gql from 'graphql-tag'
import { LandingPageForm } from './styles/Form'
import Error from './Error'
import styled from 'styled-components'
import useForm from '../utilities/useForm'
import { useMutation } from 'react-apollo'

const SIGNUP_PARENT_MUTATION = gql`
  mutation SIGNUP_PARENT_MUTATION(
    $email: String!
    $firstName: String!
    $password: String!
    $userType: String!
    $agreedToTermsAndPrivacy: DateTime!
  ) {
    signupParent(
      email: $email
      firstName: $firstName
      password: $password
      userType: $userType
      agreedToTermsAndPrivacy: $agreedToTermsAndPrivacy
    ) {
      id
      email
      firstName
      userType
      dancers {
        id
      }
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
  email: '',
  firstName: '',
  password: '',
  userType: 'parent',
}

function SignupParent() {
  const { inputs, handleChange, resetForm } = useForm(initialInputState)

  const [signupParent, { data, loading, error }] = useMutation(
    SIGNUP_PARENT_MUTATION,
    {
      variables: { ...inputs, agreedToTermsAndPrivacy: new Date(Date.now()) },
      onCompleted: (data) => {
        Router.push({
          pathname: '/parent/dancers/addDancer',
          query: {
            hasDancers: false,
          },
        })
      },
    }
  )

  return (
    <LandingPageForm
      method='post'
      onSubmit={async (e) => {
        e.preventDefault()
        await signupParent()
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign Up For A Parent Account</h2>
        <Error error={error} />
        <div>
          <label htmlFor='email' className='visuallyHidden'>
            Email
          </label>
          <input
            aria-label='email'
            type='email'
            name='email'
            placeholder='email'
            value={inputs.email}
            onChange={handleChange}
          />
        </div>
        <label htmlFor='firstName' className='visuallyHidden'>
          First Name
        </label>
        <input
          aria-label='first name'
          type='text'
          name='firstName'
          placeholder='firstName'
          value={inputs.firstName}
          onChange={handleChange}
        />
        <label htmlFor='password' className='visuallyHidden'>
          Password
        </label>
        <input
          aria-label='password'
          type='password'
          name='password'
          placeholder='password'
          value={inputs.password}
          onChange={handleChange}
        />
        <Terms>
          <p>
            By signing up, you acknowledge your agreement to our
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

export default SignupParent
