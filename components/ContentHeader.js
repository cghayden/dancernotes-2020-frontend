import React from "react";
import styled from "styled-components";
import { useDisplayControls } from "./Parent/ParentDisplayProvider";
//title with actions on right side
const HeaderStyle = styled.header`
  h1 {
    font-size: 1.2rem;
  }
  width: 100%;
  display: flex;
  align-items: center;
  display: ${props => (props.mobile ? "flex" : `none`)};
  padding: 0 8vw 10px 8vw;

  @media (min-width: ${props => props.theme.largeScreen}) {
    display: flex;
    padding: 1rem 5vw 1.5rem 5vw;
    margin-top: -10px;
    h1 {
      font-size: 1.4rem;
    }
  }
`;

const PageAction = styled.div`
  margin-left: auto;
  a,
  button {
    margin: 0;
  }
`;

const CompModeHeading = styled.h1`
  color: ${props => props.theme.green8};
`;

function ContentHeader({ mobile, page, pageAction }) {
  const { competitionMode } = useDisplayControls();
  return (
    <HeaderStyle mobile={mobile}>
      {!competitionMode && <h1>{page}</h1>}
      {competitionMode && (
        <CompModeHeading>Competition Routines</CompModeHeading>
      )}
      <PageAction>{pageAction}</PageAction>
    </HeaderStyle>
  );
}

export default ContentHeader;
