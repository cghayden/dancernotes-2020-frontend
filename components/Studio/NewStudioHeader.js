import React from "react";
import styled from "styled-components";
import OptionsDropdown from "./OptionsDropdown";
const Header = styled.header`
  background: ${(props) => props.theme.gray5};
  display: flex;
  align-items: center;
  height: ${(props) => props.theme.studioHeaderHeight};
  padding: 0 20px;
  color: white;
  .search {
    border-radius: 5px;
    background: ${(props) => props.theme.gray0};
    width: 30%;
    height: 30px;
  }
`;

export default function NewStudioHeader() {
  return (
    <Header>
      <input type="text" placeholder="Search..." className="search" />
      <OptionsDropdown />
    </Header>
  );
}
