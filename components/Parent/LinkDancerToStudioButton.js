import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { DANCER_QUERY } from "./DancerQuery";

const LINK_DANCER_TO_STUDIO_MUTATION = gql`
  mutation LINK_DANCER_TO_STUDIO_MUTATION($dancerId: ID!, $studioId: ID!) {
    linkDancerToStudio(dancerId: $dancerId, studioId: $studioId) {
      studioName
    }
  }
`;

class LinkDancerToStudioButton extends Component {
  render() {
    return (
      <Mutation
        mutation={LINK_DANCER_TO_STUDIO_MUTATION}
        variables={{
          dancerId: this.props.dancerId,
          studioId: this.props.studioId,
        }}
        refetchQueries={[
          { query: DANCER_QUERY, variables: { id: this.props.dancerId } },
        ]}
      >
        {(linkDancerToStudio, { data }) => {
          return (
            <button onClick={async () => await linkDancerToStudio()}>
              Link Dancer To Studio
            </button>
          );
        }}
      </Mutation>
    );
  }
}

export default LinkDancerToStudioButton;
