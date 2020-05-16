import styled from "styled-components";

const PageOptions = styled.div`
  background: ${(props) => props.theme.gray0};
  width: clamp(180px, 20vw, 230px);
  /* max-width: 230px;
  width: 20vw;
  min-width: 180px; */
  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 14px;
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

    &:hover,
    &:focus {
      color: ${(props) => props.theme.indigo0};
      background: ${(props) => props.theme.indigo5};
      outline: none;
      /* border-bottom: 2px solid ${(props) => props.theme.indigo8}; */
      /* margin-bottom: -2px; */
    }
  }`;
export default PageOptions;
