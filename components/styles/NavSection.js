import styled from "styled-components";

const NavSection = styled.div`
  /* not last child: */
  &:after {
    height: 2px;
    width: 75%;
    margin: 4px auto;
    content: "";
    display: block;
    background-image: linear-gradient(
      to right,
      ${(props) => props.theme.gray0} 0%,
      ${(props) => props.theme.indigo1} 10%,
      ${(props) => props.theme.indigo5} 50%,
      ${(props) => props.theme.indigo1} 90%,
      ${(props) => props.theme.gray0} 100%
    );
    /* background-size: 50% auto; */
  }

  h2 {
    color: ${(props) => props.theme.black};
    padding: 1rem 0 1rem 1rem;
  }
`;

export default NavSection;
