import styled from "styled-components";

const ContentLayout = styled.div`
  background: ${props => props.theme.background};
  margin: ${props => props.theme.mobileStatusBarHeight} auto 0 auto;
  height: calc(100vh - ${props => props.theme.navHeight});

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - ${props => props.theme.navHeight});
    overflow-y: scroll;
  }

  @media (min-width: ${props => props.theme.largeScreen}) {
    main {
      grid-column: 2;
    }
    display: grid;
    grid-template-columns: fit-content(200px) 1fr fit-content(220px);
    margin-top: ${props => props.theme.navHeight};
  }
`;

export default ContentLayout;
