import React from "react";
import styled from "styled-components";

const Header = styled.header`
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0; */
  background: ${(props) => props.theme.black};
  display: flex;
  align-items: center;
  height: ${(props) => props.theme.studioHeaderHeight};
  padding: 0 20px;
  .search {
    border-radius: 5px;
    background: ${(props) => props.theme.gray0};
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
