//title with actions on right side
import React from "react";
import styled from "styled-components";

// z-index on header prevents dancer cards from overlapping and prevents click event on action buttons/links in the header
const HeaderStyle = styled.header`
  width: 90%;
  display: flex;
  align-items: center;
  padding: 1rem;
  z-index: 100;
`;

const Actions = styled.div`
  margin-left: auto;
  color: ${props => props.theme.vividBlue9};
  @media (max-width: ${props => props.theme.largeScreen}) {
    display: none;
  }
`;

function ContentHeader({ page, action }) {
  return (
    <HeaderStyle>
      <h1>{page}</h1>
      <Actions>{action}</Actions>
    </HeaderStyle>
  );
}

export default ContentHeader;
