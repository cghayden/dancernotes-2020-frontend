import React from 'react';
import Router from 'next/router';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { LandingPageForm } from '../../components/styles/Form';
import Error from '../../components/Error';
import useForm from '../../utilities/useForm';

const RESET_STUDIO_PASSWORD = gql`
  mutation RESET_STUDIO_PASSWORD(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetStudioPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
    }
  }
`;

const initialInputState = {
  password: '',
  confirmPassword: '',
};

function ResetStudioPassword({ resetToken }) {
  const { inputs, updateInputs, handleChange } = useForm(initialInputState);
  const [resetStudioPassword, { loading, error }] = useMutation(
    RESET_STUDIO_PASSWORD,
    {
      variables: { ...inputs, resetToken },
      onCompleted: () => Router.push('/studio'),
    }
  );

  return (
    <LandingPageForm
      method='post'
      onSubmit={async (e) => {
        e.preventDefault();
        await resetStudioPassword();
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <div className='form-header'>
          <h2>Reset Your Password</h2>
        </div>
        <div className='form-content'>
          <Error error={error} />
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
          <label htmlFor='confirmPassword' className='visuallyHidden'>
            Confirm Password
          </label>
          <input
            type='password'
            name='confirmPassword'
            placeholder='confirmPassword'
            value={inputs.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type='submit'>Reset Password</button>
      </fieldset>
    </LandingPageForm>
  );
}

export default ResetStudioPassword;
