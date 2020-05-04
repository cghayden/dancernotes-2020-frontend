import React, { Component } from "react"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import styled from "styled-components"

import { LandingPageForm } from "./styles/Form"
import Error from "./Error"
import Router from "next/router"

const SIGNUP_STUDIO_MUTATION = gql`
  mutation SIGNUP_STUDIO_MUTATION(
    $email: String!
    $studioName: String!
    $userType: String!
    $password: String!
    $agreedToTermsAndPrivacy: DateTime!
  ) {
    signupStudio(
      email: $email
      studioName: $studioName
      userType: $userType
      password: $password
      agreedToTermsAndPrivacy: $agreedToTermsAndPrivacy
    ) {
      id
      email
      studioName
    }
  }
`

class StudioSignup extends Component {
  state = {
    studioName: "",
    password: "",
    email: "",
    userType: "studio",
  }
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  toggleAgreeToTerms = () => {
    this.setState({ agreeToTerms: !this.state.agreeToTerms })
  }
  toggleReadPrivacy = () => {
    this.setState({ readPrivacy: !this.state.readPrivacy })
  }

  render() {
    return (
      <Mutation
        mutation={SIGNUP_STUDIO_MUTATION}
        variables={{
          ...this.state,
          agreedToTermsAndPrivacy: new Date(Date.now()),
        }}
        onCompleted={() => {
          Router.push(`/studio/home`)
        }}
      >
        {(signupStudio, { error, loading }) => (
          <LandingPageForm
            method="post"
            onSubmit={async (e) => {
              e.preventDefault()
              await signupStudio()
              this.setState({ studioName: "", email: "", password: "" })
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
              <Terms>
                <p>
                  By signing up, you agree to our
                  <a
                    rel="noreferrer noopener"
                    target="_blank"
                    href="https://www.websitepolicies.com/policies/view/Xd9syaYo"
                  >
                    Terms
                  </a>
                  and
                  <a
                    rel="noreferrer noopener"
                    target="_blank"
                    href="https://www.websitepolicies.com/policies/view/Xd9syaYo"
                  >
                    Privacy Policy
                  </a>
                </p>
              </Terms>
              <button type="submit">Sign Up</button>
            </fieldset>
          </LandingPageForm>
        )}
      </Mutation>
    )
  }
}

const Terms = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
  a {
    display: inline-block;
    padding: 0 5px;
    margin: 0;
    text-decoration: underline;
    text-transform: uppercase;
  }
`

export default StudioSignup
