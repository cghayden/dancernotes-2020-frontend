import styled from "styled-components";
import EnrolledDancers from "./EnrolledDancers";
import { useDisplayControls } from "./ParentDisplayProvider";

const HeaderStyle = styled.div`
  display: grid;
  grid-template-columns: 33% 1fr 50px;
  align-items: center;
  ul {
    display: flex;
    li {
      padding: 0 5px;
    }
  }
`;
const DanceCardTitle = styled.div`
  font-size: 0.875rem;
  grid-column: 1 / -1;
  grid-row: 1;
  p:first-child {
    font-weight: 600;
    font-size: larger;
  }
  p:last-child {
    font-style: italic;
  }
  @media (min-width: ${props => props.theme.largeScreen}) {
    font-size: 1rem;
  }
`;

const DanceCardTime = styled.div`
  font-size: 0.675rem;
  grid-column: 3/-1;
  grid-row: 1;
  color: ${props => (props.comp ? props.theme.green8 : "inherit")};

  @media (min-width: ${props => props.theme.largeScreen}) {
    font-size: 0.825rem;
  }
`;
const DanceCardEntryInfo = styled.div`
  color: red;
  font-size: 0.825rem;
  grid-column: 1/2;
  grid-row: 1;

  @media (min-width: ${props => props.theme.largeScreen}) {
    font-size: 0.825rem;
  }
`;

function formatTime(timeString) {
  const array = timeString.split(":");
  let hours = parseInt(array[0]);
  if (hours == 12) {
    return hours + ":" + array[1] + "pm";
  }
  if (hours > 12) {
    hours -= 12;
    return hours + ":" + array[1] + "pm";
  } else {
    return timeString + "am";
  }
}

const DanceCardHeader = ({ dance, visibleDancersIds }) => {
  const { competitionMode } = useDisplayControls();
  return (
    <HeaderStyle>
      <EnrolledDancers
        visibleDancersIds={visibleDancersIds}
        dancers={dance.dancers}
      />
      <DanceCardTitle>
        <p>{dance.name}</p>
        <p>{dance.performanceName}</p>
      </DanceCardTitle>
      {!competitionMode ? (
        <DanceCardTime>
          <p>{dance.day}</p>
          {dance.startTime && <p>{formatTime(dance.startTime)}</p>}
        </DanceCardTime>
      ) : (
        <DanceCardTime comp={competitionMode}>
          <p>{dance.entryNumber}</p>
          <p>{dance.entryDay}</p>
          <p>{dance.entryTime}</p>
        </DanceCardTime>
      )}
    </HeaderStyle>
  );
};

export default DanceCardHeader;
