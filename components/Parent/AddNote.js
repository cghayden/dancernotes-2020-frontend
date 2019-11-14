import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_Rs } from "./Queries";

const ADD_NOTE_MUTATION = gql`
  mutation ADD_NOTE_MUTATION($danceId: ID!, $note: String!) {
    addNote(danceId: $danceId, note: $note) {
      id
      note
    }
  }
`;

class DanceCardFooter extends Component {
  state = {
    showInput: false,
    note: "",
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  updateNotes = (cache, payload) => {
    const newNote = payload.data.addNote;
    const data = cache.readQuery({ query: ALL_Rs });
    for (const dance of data.allRs) {
      if (dance.id === this.props.danceId) {
        dance.parentsNotes.push(newNote.note);
      }
    }
    cache.writeQuery({ query: ALL_Rs, data });
  };

  render() {
    return (
      <Mutation
        mutation={ADD_NOTE_MUTATION}
        variables={{ danceId: this.props.danceId, note: this.state.note }}
        update={this.updateNotes}
      >
        {(addNote, loading, error) => {
          return (
            <div className="card__section">
              <label htmlFor="note">
                New Note:
                <textarea
                  id="note"
                  type="text"
                  name="note"
                  rows="3"
                  value={this.state.note}
                  onChange={this.handleChange}
                />
              </label>
              <button
                onClick={async () => {
                  await addNote();
                  this.props.hideNote();
                }}
              >
                Save
              </button>
              <button onClick={this.props.hideNote}>Cancel</button>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
export default DanceCardFooter;
