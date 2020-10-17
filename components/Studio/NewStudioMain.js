import React from "react";
import styled from "styled-components";

const NewMain = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
`;

export default function NewStudioMain({ children }) {
  return <NewMain>{children}</NewMain>;
}
