import styled from "styled-components";

const Card = styled.div`
  text-align: center;
  color: ${props => props.theme.indigo9};
  background-color: ${props => props.theme.gray0};
  border-radius: ${props => props.theme.borderRadius};
  margin: 0 auto 1rem auto;
  padding: 0.5rem;
  /* width: 90%; */
  min-width: 320px;
  max-width: 650px;

  .card__header {
    display: flex;
  }
  .card__header--editButton {
    margin-left: auto;
  }
  .card__section {
    padding: 0.5rem 0;
  }
`;

export default Card;
