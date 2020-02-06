import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { LandingPageForm } from "./styles/Form";
import Error from "./Error";

const REQUEST_RESET_PASSWORD = gql`
  mutation REQUEST_RESET_PASSWORD($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

function RequestResetPassword() {
  const [email, setEmail] = useState("");
  const [
    requestReset,
    { loading, error, called }
  ] = useMutation(REQUEST_RESET_PASSWORD, { variables: { email } });

  return (
    <LandingPageForm
      method="post"
      onSubmit={async e => {
        e.preventDefault();
        const message = await requestReset();
        console.log("message:", message);
        setEmail("");
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <div className="form-header">
          <h2>Reset Password</h2>
          {called && (
            <p>
              If a user is found with that email, you will receive a link to
              reset your password
            </p>
          )}
        </div>
        <div className="form-content">
          <Error error={error} />
          <label htmlFor="email" className="visuallyHidden">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Reset Password</button>
      </fieldset>
    </LandingPageForm>
  );
}

export default RequestResetPassword;
