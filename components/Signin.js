import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import Router from 'next/router'
import { LandingPageForm } from './styles/Form'
import Error from './Error'
import styled from 'styled-components'
import useForm from '../utilities/useForm'

const SigninButtonsStyle = styled.div`
  display: grid;
  place-items: center;
  grid-gap: 20px;
`

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      userType
    }
  }
`
const initialInputState = {
  email: '',
  password: '',
}
function Signin({ setView }) {
  const { inputs, handleChange, resetForm } = useForm(initialInputState)
  const [signin, { loading, error }] = useMutation(SIGNIN_MUTATION, {
    variables: { ...inputs },
    onCompleted: (data) => {
      resetForm()
      if (data.signin.userType === 'parent') {
        Router.push(`/parent/routines`)
      }
      if (data.signin.userType === 'studio') {
        Router.push(`/studio/home`)
      }
    },
  })
  return (
    <LandingPageForm
      method='post'
      onSubmit={async (e) => {
        e.preventDefault()
        await signin()
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <div className='form-header'>
          <h2>Sign Into Your Dancer Notes</h2>
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
        <SigninButtonsStyle>
          <button type='submit' className='btn-action-primary'>
            Sign In!
          </button>
          <button
            type='button'
            className='btn-small btn-danger-textOnly'
            onClick={() => setView('requestPassword')}
          >
            Reset my Password
          </button>
        </SigninButtonsStyle>
      </fieldset>
    </LandingPageForm>
  )
}

export default Signin
