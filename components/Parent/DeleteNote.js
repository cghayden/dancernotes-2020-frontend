import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_Rs } from "./Queries";
import { PARENT_NOTES_QUERY } from "./UpdateParentNotes";

const DELETE_PARENT_NOTE = gql`
  mutation DELETE_PARENT_NOTE($noteId: ID!) {
    deleteParentNote(noteId: $noteId) {
      id
      note
    }
  }
`;

export default class DeleteNote extends Component {
  updateNotes = (cache, payload) => {
    const deletedNote = payload.data.deleteParentNote;
    const data = cache.readQuery({ query: ALL_Rs });
    for (const dance of data.allRs) {
      if (dance.id === this.props.danceId) {
        const newNotes = dance.parentsNotes.filter(
          note => note !== deletedNote.note,
        );
        dance.parentsNotes = newNotes;
      }
    }
    cache.writeQuery({ query: ALL_Rs, data });
  };

  render() {
    return (
      <Mutation
        mutation={DELETE_PARENT_NOTE}
        variables={{ noteId: this.props.noteId }}
        update={this.updateNotes}
        refetchQueries={[
          {
            query: PARENT_NOTES_QUERY,
            variables: { danceId: this.props.danceId },
          },
        ]}
        optimisticResponse={{
          __typename: "Mutation",
          deleteParentNote: {
            __typename: "ParentNote",
            id: this.props.noteId,
          },
        }}
      >
        {(deleteParentNote, { loading, error }) => (
          <button
            onClick={async () => {
              await deleteParentNote();
            }}
          >
            Delete
          </button>
        )}
      </Mutation>
    );
  }
}
