import styled from "styled-components";

const ContentLayout = styled.div`
  background: ${props => props.theme.gray2};
  margin: 10rem auto 0 auto;
  height: calc(150vh - ${props => props.theme.navHeight});
  display: grid;
  grid-template-columns: 1fr;

  main {
    justify-self: center;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    /* height: calc(${props => props.theme.navHeight}); */
    /* overflow-y: scroll; */
    padding-bottom: 200px;
    padding-top: 1rem;

    .subHeading {
      padding: 0.5rem 1rem 1rem 1rem;
    }
  }

  @media (min-width: ${props => props.theme.largeScreen}) {
    margin-top: 5rem;
    width: 60vw;
    /* display: flex; */
    main {
      /* position relative to keep transition div 100% within the bounds of main? */
      position: relative;
      /* flex-grow: 2; */
    }
  }
`;

export default ContentLayout;
