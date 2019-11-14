import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import Form from "./styles/Form";
import Error from "./Error";

const SIGNIN_STUDIO_MUTATION = gql`
  mutation SIGNIN_STUDIO_MUTATION($email: String!, $password: String!) {
    signinStudio(email: $email, password: $password) {
      id
      email
    }
  }
`;

class SigninStudio extends Component {
  state = {
    email: "",
    password: "",
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={SIGNIN_STUDIO_MUTATION}
        variables={this.state}
        // refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        onCompleted={data => {
          Router.push(`/studio/home`);
        }}
      >
        {(mutatefunc, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await mutatefunc();
              this.setState({ email: "", password: "" });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign Into Your Studio Account</h2>
              <Error error={error} />
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>
              <button type="submit">Sign In!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default SigninStudio;
