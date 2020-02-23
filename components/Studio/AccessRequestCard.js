import React, { Component } from "react";
import styled from "styled-components";
import Card from "../styles/Card";
import ConfirmAccessRequest from "./ConfirmAccessRequest";

const CardStyle = styled(Card)`
  li {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

const AccessRequestCard = ({ request }) => {
  return (
    <CardStyle>
      <h2>
        {request.parent.firstName}
        {request.parent.lastName} requests access to your studio notes:
      </h2>
      <p>
        This includes access to hairstyles, makeup sets, events, and other non
        dance class specific notifications
      </p>
      <p>
        Access is not granted to any dance classes without a student enrolled in
        the class
      </p>
      <ConfirmAccessRequest
        request={request}
        requestId={request.id}
        parentId={request.parent.id}
      />
    </CardStyle>
  );
};

export default AccessRequestCard;
