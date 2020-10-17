import React from "react";
import styled from "styled-components";

const Header = styled.header`
  background: ${(props) => props.theme.gray3};
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  .search {
    width: 30%;
    height: 30px;
  }
  .create {
    margin-left: auto;
  }
`;

export default function NewStudioHeader() {
  return (
    <Header>
      <input type="text" placeholder="Search..." className="search" />
      <p className="create">Create ( + )</p>
    </Header>
  );
}
