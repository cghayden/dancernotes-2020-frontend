import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import { PARENT_USER_QUERY } from "../components/Parent/ParentUserQuery";
import Form from "./styles/Form";
import Error from "./Error";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      userType
    }
  }
`;

const SIGNIN_PARENT_MUTATION = gql`
  mutation SIGNIN_PARENT_MUTATION($email: String!, $password: String!) {
    signinParent(email: $email, password: $password) {
      id
      email
      userType
    }
  }
`;

class SigninParent extends Component {
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
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        // refetchQueries={[{ query: PARENT_USER_QUERY }]}
        onCompleted={async data => {
          await console.log("data:", data);
          // Router.push(`/parent/notes/routines`);
        }}
      >
        {(signin, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await signin();

              this.setState({ email: "", password: "" });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign Into Your Parent Account</h2>
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

export default SigninParent;
