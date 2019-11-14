import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const Signout = () => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    onCompleted={data => {
      Router.push(`/`);
    }}
  >
    {(signout, { client }) => {
      return (
        <button
          onClick={async () => await signout().then(() => client.clearStore())}
        >
          Sign Out
        </button>
      );
    }}
  </Mutation>
);
export default Signout;
export { SIGN_OUT_MUTATION };
