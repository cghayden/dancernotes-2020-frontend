import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { LandingPageForm } from "./styles/Form";
import Error from "./Error";
import Router from "next/router";

const SIGNUP_STUDIO_MUTATION = gql`
  mutation SIGNUP_STUDIO_MUTATION(
    $email: String!
    $studioName: String!
    $userType: String!
    $password: String!
  ) {
    signupStudio(
      email: $email
      studioName: $studioName
      userType: $userType
      password: $password
    ) {
      id
      email
      studioName
    }
  }
`;

class StudioSignup extends Component {
  state = {
    studioName: "",
    password: "",
    email: "",
    userType: "studio"
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNUP_STUDIO_MUTATION}
        variables={this.state}
        onCompleted={data => {
          Router.push(`/studio/home`);
        }}
        // refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signupStudio, { error, loading }) => (
          <LandingPageForm
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await signupStudio();
              this.setState({ studioName: "", email: "", password: "" });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <div className="form-header">
                <h2>Sign Up for A Studio Account</h2>
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
                  value={this.state.email}
                  onChange={this.saveToState}
                />
                <label htmlFor="studioName" className="visuallyHidden">
                  Studio Name
                </label>
                <input
                  type="text"
                  name="studioName"
                  placeholder="Studio Name"
                  value={this.state.studioName}
                  onChange={this.saveToState}
                />
                <label htmlFor="password" className="visuallyHidden">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </div>

              <button type="submit">Let's Go !!!</button>
            </fieldset>
          </LandingPageForm>
        )}
      </Mutation>
    );
  }
}

export default StudioSignup;
