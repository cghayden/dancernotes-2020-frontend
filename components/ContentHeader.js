//title with actions on right side
import React from "react";
import styled from "styled-components";

// z-index on header prevents dancer cards from overlapping and prevents click event on action buttons/links in the header
const HeaderStyle = styled.header`
  h1 {
    font-size: 1.2rem;
  }
  width: 100%;
  /* min-width: 550px; */
  display: flex;
  align-items: center;
  padding: 0 8vw 0.5rem 8vw;
  @media (min-width: ${props => props.theme.largeScreen}) {
    display: ${props => !props.mobile && `none`};
    padding-bottom: 2rem;
    margin-top: -10px;
    h1 {
      font-size: 1.4rem;
    }
  }
`;

const PageAction = styled.div`
  margin-left: auto;
`;

function ContentHeader({ mobile, page, pageAction }) {
  return (
    <HeaderStyle mobile={mobile}>
      <h1>{page}</h1>
      <PageAction>{pageAction}</PageAction>
    </HeaderStyle>
  );
}

export default ContentHeader;
