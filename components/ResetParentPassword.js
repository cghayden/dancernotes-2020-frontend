import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { LandingPageForm } from "./styles/Form";
import Error from "./Error";
import useForm from "../lib/useForm";

const RESET_PARENT_PASSWORD = gql`
  mutation RESET_PARENT_PASSWORD(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetParentPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
    }
  }
`;

const initialInputState = {
  password: "",
  confirmPassword: ""
};

function ResetParentPassword({ resetToken }) {
  const { inputs, updateInputs, handleChange } = useForm(initialInputState);
  const [resetParentPassword, { loading, error }] = useMutation(
    RESET_PARENT_PASSWORD,
    {
      variables: { ...inputs, resetToken }
    }
  );

  return (
    <LandingPageForm
      method="post"
      onSubmit={async e => {
        e.preventDefault();
        await resetParentPassword();
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <div className="form-header">
          <h2>Reset Your Password</h2>
        </div>
        <div className="form-content">
          <Error error={error} />
          <label htmlFor="password" className="visuallyHidden">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={inputs.password}
            onChange={handleChange}
          />
          <label htmlFor="confirmPassword" className="visuallyHidden">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="confirmPassword"
            value={inputs.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Reset Password</button>
      </fieldset>
    </LandingPageForm>
  );
}

export default ResetParentPassword;
