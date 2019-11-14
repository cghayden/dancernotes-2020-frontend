import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import { PARENT_NOTES_QUERY } from "./UpdateParentNotes";
import { ALL_Rs } from "./Queries";

const UPDATE_PARENT_NOTE = gql`
  mutation UPDATE_PARENT_NOTE($noteId: ID!, $note: String!) {
    updateParentNote(noteId: $noteId, note: $note) {
      id
      note
    }
  }
`;

export default class SaveNoteButton extends Component {
  updateNotes = (cache, payload) => {
    const updatedNote = payload.data.updateParentNote;
    const data = cache.readQuery({ query: ALL_Rs });
    for (const dance of data.allRs) {
      if (dance.id === this.props.danceId) {
        const index = dance.parentsNotes.indexOf(this.props.oldNote);
        dance.parentsNotes.splice(index, 1, updatedNote.note);
      }
    }
    cache.writeQuery({ query: ALL_Rs, data });
  };

  render() {
    return (
      <Mutation
        mutation={UPDATE_PARENT_NOTE}
        variables={{ noteId: this.props.noteId, note: this.props.note }}
        refetchQueries={[
          {
            query: PARENT_NOTES_QUERY,
            variables: { danceId: this.props.danceId },
          },
        ]}
        update={this.updateNotes}
      >
        {(updateParentNote, { error, loading }) => (
          <button
            onClick={async () => {
              await updateParentNote();
              // this.props.clearNote();
            }}
          >
            Save
          </button>
        )}
      </Mutation>
    );
  }
}
