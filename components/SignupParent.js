import { Component } from "react";
import { Mutation } from "react-apollo";
import Router from "next/router";
import gql from "graphql-tag";
import { LandingPageForm } from "./styles/Form";
import Error from "./Error";
import styled from "styled-components";

const SIGNUP_PARENT_MUTATION = gql`
  mutation SIGNUP_PARENT_MUTATION(
    $email: String!
    $firstName: String!
    $password: String!
    $userType: String!
    $agreeToTerms: DateTime!
    $readPrivacy: DateTime!
  ) {
    signupParent(
      email: $email
      firstName: $firstName
      password: $password
      userType: $userType
      agreeToTerms: $agreeToTerms
      readPrivacy: $readPrivacy
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

const Terms = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  input[type="checkbox"] {
    width: auto;
    margin-right: 0.5rem;
    margin-bottom: 0;
  }
  a {
    display: inline-block;
    padding: 0;
    margin: 0;
    text-decoration: underline;
    text-transform: uppercase;
  }
`;

class SignupParent extends Component {
  state = {
    email: "",
    firstName: "",
    password: "",
    userType: "parent",
    agreeToTerms: false,
    readPrivacy: false
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleAgreeToTerms = () => {
    this.setState({ agreeToTerms: !this.state.agreeToTerms });
  };
  toggleReadPrivacy = () => {
    this.setState({ readPrivacy: !this.state.readPrivacy });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNUP_PARENT_MUTATION}
        variables={{
          ...this.state,
          agreeToTerms: new Date(Date.now()),
          readPrivacy: new Date(Date.now())
        }}
        onCompleted={data => {
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
              <Terms>
                <input
                  required
                  checked={this.state.agreeToTerms}
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  value={this.state.agreeToTerms}
                  onChange={() => this.toggleAgreeToTerms()}
                />
                <label>
                  I have read an agree to the{" "}
                  <a
                    rel="noreferrer noopener"
                    target="_blank"
                    href="https://www.websitepolicies.com/policies/view/Xd9syaYo
"
                  >
                    terms of service
                  </a>
                </label>
              </Terms>
              <Terms>
                <input
                  required
                  checked={this.state.readPrivacy}
                  type="checkbox"
                  id="readPrivacy"
                  name="readPrivacy"
                  value={this.state.readPrivacy}
                  onChange={() => this.toggleReadPrivacy()}
                />
                <label>
                  I have read an agree to the{" "}
                  <a
                    rel="noreferrer noopener"
                    target="_blank"
                    href="https://www.websitepolicies.com/policies/view/Xd9syaYo
"
                  >
                    privacy policy
                  </a>
                </label>
              </Terms>
              <button type="submit">Let's Go !!!</button>
            </fieldset>
          </LandingPageForm>
        )}
      </Mutation>
    );
  }
}

export default SignupParent;
