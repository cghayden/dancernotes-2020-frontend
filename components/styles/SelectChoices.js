import styled from 'styled-components'

const SelectChoices = styled.ul`
  margin-bottom: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  li {
    border-radius: ${(props) => props.theme.borderRadius};
    margin-left: 1rem;
    margin-bottom: 2px;
    background-color: ${(props) => props.theme.teal6};
    color: white;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    display: grid;
    grid-template-columns: 1fr 20px;
    grid-gap: 10px;
    > p {
      margin-right: 16px;
    }
  }
  button {
    padding: 0;
    margin: 0 0 0 5px;
    font-size: 14px;
    width: 18px;
    height: 18px;
    background: white;
    color: ${(props) => props.theme.red7};
    border-radius: 50%;
  }
`

export { SelectChoices }
