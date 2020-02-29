import styled from "styled-components";
import Link from "next/link";
import Card from "../styles/Card";

const DanceCardBodyStyles = styled.div`
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

const Dt = styled.dt`
  font-weight: bold;
`;
const Dd = styled.dd`
  margin-left: 1rem;
  text-align: left;
  white-space: pre-wrap;
`;

function StudioDanceDetails({ dance }) {
  return (
    <DanceCardBodyStyles>
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
          <Dt>Age Divsion:</Dt> <Dd>{dance.ageDivision}</Dd>
        </NoteItem>
        <NoteItem>
          <Dt>Level:</Dt> <Dd>{dance.competitiveLevel}</Dd>
        </NoteItem>
        <NoteItem>
          <Dt>Style:</Dt> <Dd>{dance.style}</Dd>
        </NoteItem>
        <NoteItem>
          <Dt>Size:</Dt> <Dd>{dance.size}</Dd>
        </NoteItem>
        <NoteItem>
          <Dt>Shoes:</Dt> <Dd>{dance.shoes}</Dd>
        </NoteItem>
        <NoteItem>
          <Dt>Tights:</Dt> <Dd>{dance.tights}</Dd>
        </NoteItem>
        <NoteItem>
          <Dt>Notes:</Dt> <Dd>{dance.notes}</Dd>
        </NoteItem>

        <NoteItem>
          <Dt>Dancers:</Dt>
          <Dd>
            {dance.dancers.map((dancer, index) => (
              <p key={index}>{dancer.firstName}</p>
            ))}
          </Dd>
        </NoteItem>
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
