import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Error from "../../components/Error";
import { ENROLLMENT_REQUESTS_QUERY } from "./Queries";
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

const CONFIRM_ENROLLMENT_REQUEST = gql`
  mutation CONFIRM_ENROLLMENT_REQUEST(
    $danceClassId: ID!
    $dancerId: ID!
    $requestId: ID!
    $parentId: ID!
  ) {
    confirmEnrollmentRequest(
      danceClassId: $danceClassId
      dancerId: $dancerId
      requestId: $requestId
      parentId: $parentId
    ) {
      message
    }
  }
`;

export default class ConfirmRequest extends Component {
  render() {
    const { danceClassId, request } = this.props;
    return (
      <Mutation
        mutation={CONFIRM_ENROLLMENT_REQUEST}
        variables={{
          danceClassId,
          dancerId: request.dancer.id,
          requestId: request.id,
          parentId: request.parent.id,
        }}
        refetchQueries={[{ query: ENROLLMENT_REQUESTS_QUERY }]}
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
              {loading ? `Enrolling...` : "Confirm: Enroll Student"}
            </ConfirmButton>
          </>
        )}
      </Mutation>
    );
  }
}
