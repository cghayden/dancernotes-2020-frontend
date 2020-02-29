import React from "react";
import Card from "../styles/Card";
import styled from "styled-components";

const DancerCard = styled(Card)`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const DancerInfoDiv = styled.div``;
const Name = styled.h2`
  grid-column: 1/-1;
`;
function StudioDancerCard({ dancer }) {
  console.log("dancer:", dancer);
  return (
    <DancerCard>
      <Name>{dancer.firstName}</Name>

      <DancerInfoDiv>
        <p>
          Parent:{"  "}
          <span>{dancer.parent.firstName}</span>
        </p>
        <p>
          Parent email:{"  "}
          <span>{dancer.parent.email}</span>
        </p>
      </DancerInfoDiv>
      <div>
        <h4>Enrolled in:</h4>
        <ul>
          {dancer.danceClasses.map((danceClass, index) => (
            <li key={index}>{danceClass.name}</li>
          ))}
        </ul>
      </div>
    </DancerCard>
  );
}

export default StudioDancerCard;
