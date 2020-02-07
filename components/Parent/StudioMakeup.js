import React from "react";
import Card from "../styles/Card";
import { DanceCardBodyStyles, NoteItem, Dt, Dd, Notes } from "./DanceCardBody";

const StudioMakeup = ({ studio }) => {
  return (
    <>
      <h2 className="py1">Makeup Sets for {studio.studioName}</h2>
      {studio.makeupSets.map(makeupSet => (
        <Card key={makeupSet.id}>
          <DanceCardBodyStyles>
            <h3>{makeupSet.name}</h3>
            <dl>
              <NoteItem>
                <Dt>Eye Shadow:</Dt> <Dd>{makeupSet.eyeShadow}</Dd>
              </NoteItem>
              <NoteItem>
                <Dt>Lipstick:</Dt> <Dd>{makeupSet.lipstick}</Dd>
              </NoteItem>
              <NoteItem>
                <Dt>Eye Lids:</Dt> <Dd>{makeupSet.eyeLids}</Dd>
              </NoteItem>
              <NoteItem>
                <Dt>Eye Crease:</Dt> <Dd>{makeupSet.eyeCrease}</Dd>
              </NoteItem>
              <NoteItem>
                <Dt>Eye Liner:</Dt> <Dd>{makeupSet.eyeLiner}</Dd>
              </NoteItem>
              <NoteItem>
                <Dt>Eyelashes:</Dt> <Dd>{makeupSet.eyelashes}</Dd>
              </NoteItem>
              <NoteItem>
                <Dt>Foundation:</Dt> <Dd>{makeupSet.foundation}</Dd>
              </NoteItem>
              <NoteItem>
                <Dt>Powder:</Dt> <Dd>{makeupSet.powder}</Dd>
              </NoteItem>
              <NoteItem>
                <Dt>Blush:</Dt> <Dd>{makeupSet.blush}</Dd>
              </NoteItem>
              <NoteItem>
                <Dt>Bronzer:</Dt> <Dd>{makeupSet.bronzer}</Dd>
              </NoteItem>
              <Notes>
                <Dt>Notes:</Dt> <Dd>{makeupSet.notes}</Dd>
              </Notes>
            </dl>
          </DanceCardBodyStyles>
        </Card>
      ))}
    </>
  );
};

export default StudioMakeup;
