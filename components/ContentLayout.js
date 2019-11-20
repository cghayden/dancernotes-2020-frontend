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
    padding-bottom: 200px;

    .subHeading {
      padding: 0.5rem 1rem 1rem 1rem;
    }
  }

  @media (min-width: ${props => props.theme.largeScreen}) {
    margin-top: ${props => props.theme.navHeight};
    display: flex;
    main {
      /* position relative to keep transition div 100% within the bounds of main? */
      position: relative;
      flex-grow: 2;
    }
  }
`;

export default ContentLayout;
