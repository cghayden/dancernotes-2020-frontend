import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Card from "../styles/Card";

const DanceCardBodyStyles = styled(Card)`
  padding: 0;
  width: unset;
  min-width: unset;

  padding-bottom: 20px;
  li {
    padding: 0.25rem;
  }
`;

const NoteItem = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  padding: 0.25rem;
`;

const NoteContent = styled.dd`
  margin: 0;
  padding-left: 0 0.5rem;
  text-align: left;
`;

const AudioPlayer = styled.audio`
  width: 85%;
  max-width: 475px;
`;

function StudioDanceDetails({ dance }) {
  return (
    <DanceCardBodyStyles>
      <h1>{dance.name}</h1>
      {dance.music && (
        <AudioPlayer
          id="musicPlayer"
          autoPlay={false}
          controls
          src={dance.music}
        />
      )}
      <dl>
        <NoteItem>
          <dt>divsion:</dt> <NoteContent>{dance.divsion}</NoteContent>
        </NoteItem>
        <NoteItem>
          <dt>competitiveLevel:</dt> <NoteContent>{dance.competitiveLevel}</NoteContent>
        </NoteItem>
        <NoteItem>
          <dt>Style:</dt> <NoteContent>{dance.style}</NoteContent>
        </NoteItem>
        <NoteItem>
          <dt>Size:</dt> <NoteContent>{dance.size}</NoteContent>
        </NoteItem>
        <NoteItem>
          <dt>Shoes:</dt> <NoteContent>{dance.shoes}</NoteContent>
        </NoteItem>
        <NoteItem>
          <dt>Tights:</dt> <NoteContent>{dance.tights}</NoteContent>
        </NoteItem>
        <NoteItem>
          <dt>Notes:</dt> <NoteContent>{dance.notes}</NoteContent>
        </NoteItem>
        <NoteItem>
          <dt>Makeup:</dt>{" "}
          <NoteContent>
            {dance.makeupSet ? dance.makeupSet.name : "N/A"}
          </NoteContent>
        </NoteItem>
        <NoteItem>
          <dt>Hair:</dt>{" "}
          <NoteContent>{dance.hairStyle ? dance.hairStyle : "N/A"}</NoteContent>
        </NoteItem>
        <NoteItem>
          <dt>Dancers:</dt>
          <NoteContent>
            {dance.dancers.map((dancer, index) => (
              <p key={index}>{dancer.firstName}</p>
            ))}
          </NoteContent>
        </NoteItem>
        {/* {this.state.addNote && (
            <AddNote hideNote={this.hideNote} danceId={dance.id} />
          )} */}
      </dl>
      <div>
        <Link href={`/studio/updateClass/${dance.id}`}>
          <a>Edit</a>
        </Link>
      </div>
    </DanceCardBodyStyles>
  );
}

export default StudioDanceDetails;
