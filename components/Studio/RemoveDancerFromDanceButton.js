import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { SINGLE_DANCE_QUERY } from "./Queries";

const REMOVE_DANCER_FROM_DANCE_MUTATION = gql`
  mutation REMOVE_DANCER_FROM_DANCE_MUTATION($dancerId: ID!, $danceId: ID!) {
    removeDancerFromDance(dancerId: $dancerId, danceId: $danceId) {
      message
    }
  }
`;

class RemoveDancerFromDanceButton extends Component {
  render() {
    return (
      <Mutation
        mutation={REMOVE_DANCER_FROM_DANCE_MUTATION}
        variables={{
          danceId: this.props.danceId,
          dancerId: this.props.dancerId,
        }}
        refetchQueries={[
          { query: SINGLE_DANCE_QUERY, variables: { id: this.props.danceId } },
        ]}
      >
        {removeDancerFromDance => (
          <button onClick={async () => await removeDancerFromDance()}>
            Remove Dancer
          </button>
        )}
      </Mutation>
    );
  }
}

export default RemoveDancerFromDanceButton;
