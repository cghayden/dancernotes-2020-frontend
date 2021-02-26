import styled from 'styled-components'

const HeaderStyles = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${(props) => props.theme.gray5};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${(props) => props.theme.mobileHeaderHeight};
  padding: 0 20px;
  color: white;
  z-index: 50000;
  button {
    padding: 0;
    margin-left: auto;
  }
  .search {
    border-radius: 5px;
    background: ${(props) => props.theme.gray0};
    width: 40%;
    height: 20px;
  }
  @media (min-width: ${(props) => props.theme.largeScreen}) {
    height: ${(props) => props.theme.desktopHeaderHeight};
    .search {
      border-radius: 5px;
      background: ${(props) => props.theme.gray0};
      width: 30%;
      height: 30px;
    }
    button {
      padding: 0;
      margin-left: auto;
    }
  }
`
export { HeaderStyles }
