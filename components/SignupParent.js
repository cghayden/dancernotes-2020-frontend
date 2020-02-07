import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Router from "next/router";
import gql from "graphql-tag";
import { LandingPageForm } from "./styles/Form";
import Error from "./Error";

const SIGNUP_PARENT_MUTATION = gql`
  mutation SIGNUP_PARENT_MUTATION(
    $email: String!
    $firstName: String!
    $password: String!
    $userType: String!
  ) {
    signupParent(
      email: $email
      firstName: $firstName
      password: $password
      userType: $userType
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
`;

class SignupParent extends Component {
  state = {
    email: "",
    firstName: "",
    password: "",
    userType: "parent"
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNUP_PARENT_MUTATION}
        variables={this.state}
        onCompleted={data => {
          console.log("data:", data);
          Router.push({
            pathname: "/parent/account/addDancer",
            query: {
              hasDancers: false
            }
          });
        }}
      >
        {(signupParent, { error, loading }) => (
          <LandingPageForm
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await signupParent();
              this.setState({
                firstName: "",
                email: "",
                password: ""
              });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign Up For A Parent Account</h2>

              <Error error={error} />

              <div>
                <label htmlFor="email" className="visuallyHidden">
                  Email
                </label>
                <input
                  aria-label="email"
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </div>
              <label htmlFor="firstName" className="visuallyHidden">
                First Name
              </label>

              <input
                aria-label="first name"
                type="text"
                name="firstName"
                placeholder="firstName"
                value={this.state.firstName}
                onChange={this.saveToState}
              />

              <label htmlFor="password" className="visuallyHidden">
                Password
              </label>
              <input
                aria-label="password"
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.saveToState}
              />
              <button type="submit">Let's Go !!!</button>
            </fieldset>
          </LandingPageForm>
        )}
      </Mutation>
    );
  }
}

export default SignupParent;
