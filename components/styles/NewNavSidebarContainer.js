import styled from "styled-components";

const NewNavSidebarContainer = styled.div`
  background: ${(props) => props.theme.gray0};
  min-width: 150px;
  max-width: 200px;
  width: 20vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${(props) => props.theme.gray3};
  /* grid-row: 2/-1; */

  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 16px;
    letter-spacing: 0.02rem;
  }

  a,
  button {
    border-radius: 0;
    margin: 0;
    padding: 10px 0.5rem 0.5rem 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;

    &:hover {
      color: hsl(200, 95%, 95%);
      background: ${(props) => props.theme.indigo5};
    }
  }
`;
export default NewNavSidebarContainer;

// old styles - isMobileDevice
/* border-bottom: 1px solid ${(props) => props.theme.gray2}; */
/* position: fixed; */
/* top: ${(props) => props.theme.mobileStatusBarHeight}; */
/* left: 0; */
/* right: 0; */
/* z-index: 120; */
/* z-index to keep it on top of main, to allow click events on navlinks */
/* h1,
h2,
h3,
h4,
h5,
h6 {
  display: none;
  text-transform: none;
} */
