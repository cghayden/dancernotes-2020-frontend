import styled from 'styled-components'

const MobileNavContainer = styled.div`
  background: ${(props) => props.theme.gray3};
  box-shadow: ${(props) => props.theme.dropShadow3};
  color: ${(props) => props.theme.blackText};
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 95vw;
  max-width: 400px;
  position: fixed;
  top: 60px;
  right: 0;
  height: auto;
  overflow: hidden;
  z-index: 101;
  @media screen and (min-width: ${(props) => props.theme.largeScreen}) {
    display: none;
  }
`

export { MobileNavContainer }
