import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_Rs } from "./Queries";
// import { PARENT_NOTES_QUERY } from "./UpdateParentNotes";

const DELETE_PARENT_NOTE = gql`
  mutation DELETE_PARENT_NOTE($noteId: ID!) {
    deleteParentNote(noteId: $noteId) {
      id
      note
    }
  }
`;

export default class DeleteNote extends Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_PARENT_NOTE}
        variables={{ noteId: this.props.noteId }}
        update={this.updateNotes}
        refetchQueries={[{ query: ALL_Rs }]}
        awaitRefetchQueries={true}
      >
        {(deleteParentNote, { loading, error }) => (
          <button
            type="button"
            className="btn-danger-outline btn-small"
            onClick={async () => {
              await deleteParentNote();
              this.props.toggleEditNotes(false);
            }}
          >
            Delete
          </button>
        )}
      </Mutation>
    );
  }
}
