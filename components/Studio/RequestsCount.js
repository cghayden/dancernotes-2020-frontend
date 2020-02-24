import React from "react";
import styled from "styled-components";

const Dot = styled.div`
  background: ${props => props.theme.red5};
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  margin-left: 0.5rem;
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
  @media (min-width: ${props => props.theme.largeScreen}) {
    width: 2rem;
    height: 2rem;
  }
`;

const RequestsCount = ({ count }) => <Dot>{count}</Dot>;

export default RequestsCount;
