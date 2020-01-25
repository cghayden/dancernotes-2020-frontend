//title with actions on right side
import React from "react";
import styled from "styled-components";

// z-index on header prevents dancer cards from overlapping and prevents click event on action buttons/links in the header
const HeaderStyle = styled.header`
  width: 100%;
  min-width: 550px;
  display: flex;
  align-items: center;
  padding: 0 8vw 1rem 8vw;
  @media (max-width: ${props => props.theme.largeScreen}) {
    display: none;
  }
`;

const PageAction = styled.div`
  margin-left: auto;
`;

function ContentHeader({ page, pageAction }) {
  return (
    <HeaderStyle>
      <h1>{page}</h1>
      <PageAction>{pageAction}</PageAction>
    </HeaderStyle>
  );
}

export default ContentHeader;
