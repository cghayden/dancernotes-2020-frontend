import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const PARENT_NOTES_QUERY = gql`
  query PARENT_NOTES_QUERY($danceId: ID!) {
    parentNotes(danceId: $danceId) {
      note
      id
    }
  }
`;

export default class ParentNotes extends Component {
  render() {
    return (
      <Query
        query={PARENT_NOTES_QUERY}
        variables={{ danceId: this.props.danceId }}
      >
        {({ data: { parentNotes } = {}, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          return (
            <>
              <h5>My Notes</h5>
              {loading && <p>Loading...</p>}
              {parentNotes &&
                parentNotes.map(note => <p key={note.id}>{note.note}</p>)}
            </>
          );
        }}
      </Query>
    );
  }
}
