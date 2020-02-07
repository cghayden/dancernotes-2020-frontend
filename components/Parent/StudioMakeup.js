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
            </dl>
          </DanceCardBodyStyles>
        </Card>
      ))}
    </>
  );
};

export default StudioMakeup;
