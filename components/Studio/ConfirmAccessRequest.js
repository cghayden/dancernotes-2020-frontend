import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Error from "../../components/Error";
import { ACCESS_REQUESTS_QUERY } from "./Queries";
import styled from "styled-components";

const ConfirmButton = styled.button`
  background: ${props => props.theme.teal5};
  transition: background-color .5s linear infinite;
  color: white;

  :disabled {
    background: ${props => props.theme.red2};
    /* animation: ${this.state.loading} 0.5s linear infinite; */
  }
`;

const CONFIRM_ACCESS_REQUEST = gql`
  mutation CONFIRM_ACCESS_REQUEST($requestId: ID!, $parentId: ID!) {
    confirmAccessRequest(requestId: $requestId, parentId: $parentId) {
      message
    }
  }
`;

export default class ConfirmAccessRequest extends Component {
  render() {
    const { request } = this.props;
    return (
      <Mutation
        mutation={CONFIRM_ACCESS_REQUEST}
        variables={{
          requestId: request.id,
          parentId: request.parent.id
        }}
        refetchQueries={[{ query: ACCESS_REQUESTS_QUERY }]}
      >
        {(confirmEnrollmentRequest, { error, loading }) => (
          <>
            {error && <Error error={error} />}
            <ConfirmButton
              disabled={loading}
              onClick={async e => {
                await confirmEnrollmentRequest();
              }}
            >
              {" "}
              {loading ? `Confirming...` : "Confirm: Allow Access"}
            </ConfirmButton>
          </>
        )}
      </Mutation>
    );
  }
}
