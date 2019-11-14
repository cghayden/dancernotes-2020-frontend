import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./Error";
import Router from "next/router";
import styled from "styled-components";

// import { CURRENT_USER_QUERY } from "./User";

const StyledForm = styled(Form)`
  padding: 10px 20px;
`;

const SIGNUP_STUDIO_MUTATION = gql`
  mutation SIGNUP_STUDIO_MUTATION(
    $email: String!
    $storeName: String!
    $userType: String!
    $password: String!
  ) {
    signupStudio(
      email: $email
      studioName: $storeName
      userType: $userType
      password: $password
    ) {
      id
      email
      storeName
    }
  }
`;

class RetailSignup extends Component {
  state = {
    storeName: "",
    password: "",
    email: "",
    userType: "retail",
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
          // Router.push(`/retail/home`);
        }}
        // refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signupStudio, { error, loading }) => (
          <StyledForm
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await signupStudio();
              this.setState({ storeName: "", email: "", password: "" });
            }}
          >
            <fieldset disabled={true} aria-busy={loading}>
              <div className="form-header">
                <h2>Sign Up for A Retailer's Account</h2>
              </div>
              <div className="form-content">
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
                <label htmlFor="storeName">
                  Store Name
                  <input
                    type="text"
                    name="storeName"
                    placeholder="Store Name"
                    value={this.state.storeName}
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
              </div>

              <button type="submit">Sign Up!</button>
            </fieldset>
          </StyledForm>
        )}
      </Mutation>
    );
  }
}

export default RetailSignup;
