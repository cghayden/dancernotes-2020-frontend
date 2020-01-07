import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import { ALL_DANCE_CLASSES_QUERY } from "./Studio/Queries";

const DELETE_DANCECLASS_MUTATION = gql`
  mutation DELETE_DANCECLASS_MUTATION($id: ID!) {
    deleteDanceClass(id: $id) {
      message
    }
  }
`;

class DeleteDanceButton extends Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_DANCECLASS_MUTATION}
        variables={{ id: this.props.id }}
        refetchQueries={[{ query: ALL_DANCE_CLASSES_QUERY }]}
        awaitRefetchQueries={true}
        onCompleted={() =>
          Router.push({
            pathname: "/studio/classes"
          })
        }
      >
        {deleteDanceClass => (
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this Class?")) {
                //mutation is a Promise, so we can catch it
                deleteDanceClass().catch(err => alert(err.message));
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

export default DeleteDanceButton;
