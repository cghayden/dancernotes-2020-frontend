import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import { HAIRSTYLES_QUERY } from "../../pages/studio/hairstyles";

const DELETE_HAIRSTYLE_MUTATION = gql`
  mutation DELETE_HAIRSTYLE_MUTATION($id: ID!) {
    deleteHairStyle(id: $id) {
      message
    }
  }
`;

class DeleteHairStyleButton extends Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_HAIRSTYLE_MUTATION}
        variables={{ id: this.props.id }}
        refetchQueries={[{ query: HAIRSTYLES_QUERY }]}
        awaitRefetchQueries={true}
        onCompleted={() =>
          Router.push({
            pathname: "/studio/hairstyles",
          })
        }
      >
        {deleteHairStyle => (
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this Hair Style?")) {
                //mutation is a Promise, so we can catch it
                deleteHairStyle().catch(err => alert(err.message));
              }
            }}
          >
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteHairStyleButton;
