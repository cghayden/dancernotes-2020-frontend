import styled from 'styled-components'

const MobileNavContainer = styled.div`
  background: ${(props) => props.theme.gray3};
  box-shadow: ${(props) => props.theme.dropShadow3};
  color: ${(props) => props.theme.blackText};
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 92vw;
  max-width: 400px;
  position: fixed;
  top: ${(props) => props.theme.mobileHeaderHeight};
  right: 0;
  height: auto;
  overflow: hidden;
  z-index: 101;

  transition: all 0.5s;
  transform: translate3d(
    ${(props) => (props.showMobileNav ? 0 : '110%')},
    0,
    0
  );

  @media screen and (min-width: ${(props) => props.theme.largeScreen}) {
    display: none;
  }
`

export { MobileNavContainer }
