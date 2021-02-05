import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Router from 'next/router'
import { LandingPageForm } from './styles/Form'
import Error from './Error'
import styled from 'styled-components'
import useForm from '../lib/useForm'

const ResetButton = styled.button``

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
function Signin({ setActive }) {
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
        <button type='submit'>Sign In!</button>
        <ResetButton
          type='button'
          className='btn-small'
          onClick={() => setActive('requestResetPassword')}
        >
          Reset my Password
        </ResetButton>
      </fieldset>
    </LandingPageForm>
  )
}

export default Signin
