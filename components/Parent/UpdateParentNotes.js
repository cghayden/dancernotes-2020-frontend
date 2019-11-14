import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import DeleteNote from "./DeleteNote";
import Error from "../Error";
import SaveNoteButton from "./SaveNoteButton";

const EditNoteInput = styled.div`
  display: grid;
  grid-template-columns: 1fr 75px 75px;
`;

const PARENT_NOTES_QUERY = gql`
  query PARENT_NOTES_QUERY($danceId: ID!) {
    parentNotes(danceId: $danceId) {
      note
      id
    }
  }
`;

export default class updateParentNote extends Component {
  state = {
    note: "",
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  clearNote = () => {
    this.setState({ note: "" });
  };

  render() {
    // save all at once
    return (
      <Query
        query={PARENT_NOTES_QUERY}
        variables={{ danceId: this.props.danceId }}
      >
        {({ data: { parentNotes } = {}, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <Error error={error} />;
          return (
            <>
              {parentNotes.map(note => (
                <EditNoteInput key={note.id}>
                  <textarea
                    id="note"
                    type="text"
                    name="note"
                    rows="2"
                    defaultValue={note.note}
                    onChange={this.handleChange}
                  />
                  <DeleteNote
                    noteId={note.id}
                    danceId={this.props.danceId}
                    refetchQuery={PARENT_NOTES_QUERY}
                  />
                  <SaveNoteButton
                    note={this.state.note}
                    noteId={note.id}
                    clearNote={this.clearNote}
                    danceId={this.props.danceId}
                    oldNote={note.note}
                  />
                </EditNoteInput>
              ))}

              <button onClick={this.props.hide}>Close</button>
            </>
          );
        }}
      </Query>
    );
  }
}

export { PARENT_NOTES_QUERY };
