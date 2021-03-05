import styled from 'styled-components'

const Card = styled.div`
  text-align: center;
  border-radius: ${(props) => props.theme.borderRadius};
  /* color: ${(props) => props.theme.newBlue[90].hsl}; */
  background-color: ${(props) => props.theme.gray1};
  box-shadow: ${(props) => props.theme.dropShadow1};
  margin: 0 auto 1rem auto;
  padding: 1rem 1vmin;
  width: 97%;
  min-width: 200px;
  max-width: 600px;
  h1,
  h2,
  h3,
  h4,
  h5 {
    padding: 5px;
  }
  h3 {
    font-size: 1.1rem;
  }
  dd {
    font-size: 14px;
  }
  &:first-child {
    margin-top: 1rem;
  }
  &:last-child {
    margin-bottom: 50vh;
  }

  .card__header {
    display: flex;
    align-items: center;
    padding-bottom: 1rem;
  }
  .card__header--editButton {
    margin-left: auto;
    padding: 0;
  }
  .card__section {
    padding: 1rem 0;
    p {
      padding: 0.5rem 0;
    }
  }
  .img-large {
    width: 300px;
    height: 300px;
  }
`

export default Card
