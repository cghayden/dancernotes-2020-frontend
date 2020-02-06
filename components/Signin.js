import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import { LandingPageForm } from "./styles/Form";
import Error from "./Error";
import styled from "styled-components";

const ResetButton = styled.button``;

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      userType
    }
  }
`;

class Signin extends Component {
  state = {
    email: "",
    password: ""
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { setActive } = this.props;
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        onCompleted={async data => {
          // console.log("data:", data);
          if (data.signin.userType === "parent") {
            Router.push(`/parent/notes/routines`);
          }
          if (data.signin.userType === "studio") {
            Router.push(`/studio/home`);
          }
        }}
      >
        {(signin, { error, loading }) => (
          <LandingPageForm
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await signin();

              this.setState({ email: "", password: "" });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <div className="form-header">
                <h2>Sign Into Your Dancer Notes</h2>
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
              <button type="submit">Sign In!</button>
              <ResetButton
                type="button"
                className="btn-small"
                onClick={() => setActive("requestResetPassword")}
              >
                Reset my Password
              </ResetButton>
            </fieldset>
          </LandingPageForm>
        )}
      </Mutation>
    );
  }
}

export default Signin;

// const UserTypeList = styled.nav`
//   ul {
//     margin: 0.5rem auto;
//     display: flex;
//     justify-content: center;
//   }

//   button {
//     margin: 0 1rem;
//     padding: 0.5rem 1.5rem;
//     font-size: 0.875rem;
//     color: white;
//     border: none;
//     box-shadow: none;
//     :focus {
//       outline: ${props => props.theme.vividBlue0} auto 6px;
//       border-radius: 0;
//     }
//     :hover {
//       background-color: ${props => props.theme.gray0};
//       color: ${props => props.theme.indigo9};
//     }
//   }
// `;

// function Signin({ usertype }) {
//   const [userType, setUserType] = useState(null);
//   let signinForm = null;
//   if (userType === "parent") {
//     signinForm = <SigninParent />;
//   }
//   if (userType === "studio") {
//     signinForm = <SigninStudio />;
//   }

//   return (
//     <div>
//       <h1>Sign In</h1>
//       <UserTypeList>
//         <ul>
//           <li>
//             <button onClick={() => setUserType("parent")}>Parents</button>
//           </li>
//           <li>
//             <button onClick={() => setUserType("studio")}>Studios</button>
//           </li>
//           <li>
//             <button onClick={() => setUserType("retail")}>Retailers</button>
//           </li>
//         </ul>
//       </UserTypeList>

//       {signinForm}
//     </div>
//   );
// }
