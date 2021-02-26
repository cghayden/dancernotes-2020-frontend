import styled from 'styled-components'

const SelectionWindowStyles = styled.div`
  height: 100vh;
  overflow-y: auto;
  position: relative;
  flex-grow: 1;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-align: center;
    padding: 1rem 0;
  }
`
const SelectionWindowHeaderStyles = styled.div`
  background: ${(props) => props.theme.gray1};
  height: ${(props) => props.theme.breadcrumbHeaderHeight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  button {
    margin: 0;
    padding: 0;
  }
`
const SelectionWindowMainStyles = styled.main`
  width: 100%;
  background: ${(props) => props.theme.gray0};
  padding-bottom: 50vh;
  display: flex;
  flex-direction: column;
  overflow: auto;
  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 1rem;
    letter-spacing: 0.02rem;
  }
`
export {
  SelectionWindowStyles,
  SelectionWindowHeaderStyles,
  SelectionWindowMainStyles,
}
