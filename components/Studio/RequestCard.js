import React, { Component } from "react";
import styled from "styled-components";
import Card from "../styles/Card";
import ConfirmRequest from "./ConfirmRequest";

const CardStyle = styled(Card)`
  li {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

const RequestCard = ({ request }) => {
  return (
    <CardStyle>
      <p>
        {request.parent.firstName} Requests for {request.dancer.firstName} to be
        enrolled in:
      </p>
      <ul>
        {request.classesRequested.map(dance => (
          <li key={dance.id}>
            <p>{dance.name}</p>
            <ConfirmRequest
              request={request}
              requestId={request.id}
              danceClassId={dance.id}
              dancerId={request.dancer.id}
            />
          </li>
        ))}
      </ul>
    </CardStyle>
  );
};

export default RequestCard;
