//title with actions on right side
import React from "react";
import styled from "styled-components";

const HeaderStyle = styled.header`
  width: 90%;
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const Actions = styled.div`
  margin-left: auto;
  color: ${props => props.theme.vividBlue9};
`;

function ContentHeader(props) {
  return (
    <HeaderStyle>
      <h1>{props.page}</h1>
      <Actions>{props.children}</Actions>
    </HeaderStyle>
  );
}

export default ContentHeader;
