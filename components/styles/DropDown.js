import styled, { keyframes } from "styled-components";

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  border: 1px solid ${props => props.theme.gray1};
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid ${props => props.theme.gray1};
  background: ${props =>
    props.highlighted ? props.theme.indigo0 : props.theme.gray0};
  color: ${props => (props.highlighted ? props.theme.indigo8 : "inherit")};
  padding: 1rem;
  transition: all 0.2s;
  ${props => (props.highlighted ? "padding-left: 1rem;" : null)};
  display: flex;
  align-items: center;
  border: ${props =>
    props.highlighted ? `2px solid ${props.theme.indigo8}` : "none"};
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }

  to {
    box-shadow: 0 0 10px 5px yellow;
  }
`;

const SearchStyles = styled.div`
  position: relative;
  width: 100%;
  input {
    width: 100%;
    padding: 10px;
    border: 0;
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
  border-bottom: 1px solid ${props => props.theme.gray1};
`;

export { DropDown, DropDownItem, SearchStyles };
