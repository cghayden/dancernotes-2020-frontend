import React, { Component } from "react";
import styled from "styled-components";
import AddNote from "./AddNote";
import UpdateParentNotes from "./UpdateParentNotes";

const DanceCardBodyStyles = styled.div`
  li {
    padding: 0.25rem;
  }
`;

const NoteItem = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  padding: 0.25rem;
`;

// const NoteLabel = styled.dt``;
const NoteContent = styled.dd`
  margin: 0;
  padding-left: 0 0.5rem;
  text-align: left;
`;

export default class DanceCardBody extends Component {
  state = {
    view: "notes",
    addNote: false,
    editNotes: false
  };

  hideNote = () => {
    this.setState({ addNote: false });
  };

  hideEdit = () => {
    this.setState({ editNotes: false });
  };

  render() {
    const { dance, showMediaPlayer, toggleMediaPlayer } = this.props;

    return (
      <DanceCardBodyStyles>
        <dl>
          <NoteItem>
            <dt>Shoes:</dt> <NoteContent>{dance.shoes}</NoteContent>
          </NoteItem>
          <NoteItem>
            <dt>Tights:</dt> <NoteContent>{dance.tights}</NoteContent>
          </NoteItem>
          <NoteItem>
            <dt>Studio Notes:</dt> <NoteContent>{dance.notes}</NoteContent>
            {dance.parentsNotes.length === 0 && (
              <button onClick={() => this.setState({ addNote: true })}>
                + Note
              </button>
            )}
          </NoteItem>
          {dance.parentsNotes.length > 0 && (
            <div>
              <NoteItem>
                <dt>My Notes:</dt>
                <NoteContent>
                  <ul>
                    {dance.parentsNotes.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </NoteContent>
              </NoteItem>
              <button
                onClick={() =>
                  this.setState({ addNote: true, editNotes: false })
                }
              >
                + Note
              </button>
              <button
                onClick={() =>
                  this.setState({ editNotes: true, addNote: false })
                }
              >
                Edit Notes
              </button>
              {this.state.editNotes && (
                <NoteContent>
                  <UpdateParentNotes danceId={dance.id} hide={this.hideEdit} />
                </NoteContent>
              )}
            </div>
          )}
          {this.state.addNote && (
            <AddNote hideNote={this.hideNote} danceId={dance.id} />
          )}
        </dl>
      </DanceCardBodyStyles>
    );
  }
}
