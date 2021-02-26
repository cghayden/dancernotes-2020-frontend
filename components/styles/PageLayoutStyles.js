import styled from 'styled-components'

const LayoutStyles = styled.div`
  height: 100vh;
`
const BodyLayoutStyles = styled.div`
  display: flex;
  margin-top: ${(props) => props.theme.mobileHeaderHeight};

  @media (min-width: ${(props) => props.theme.largeScreen}) {
    margin-top: ${(props) => props.theme.desktopHeaderHeight};
  }
`
export { LayoutStyles, BodyLayoutStyles }
