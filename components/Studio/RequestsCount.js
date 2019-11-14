import React from "react";
import styled from "styled-components";

const Dot = styled.div`
  background: ${props => props.theme.red5};
  color: white;
  border-radius: 50%;
  /* padding: 0.5rem; */
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  /* line-height: 2rem; */
  /* max-width: 2rem;
  min-width: 1rem; */
  margin-left: 0.5rem;
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
`;

const RequestsCount = ({ count }) => <Dot>{count}</Dot>;

export default RequestsCount;
