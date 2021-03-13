import styled from 'styled-components'

const SelectionWindowStyles = styled.div`
  background: ${(props) => props.theme.gray0};

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
    padding: 0.5rem 0;
  }
`
const SelectionWindowHeaderStyles = styled.div`
  background: ${(props) => props.theme.gray1};
  height: ${(props) => props.theme.breadcrumbHeaderHeight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  position: sticky;
  z-index: 100;
  top: 0;
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
  padding-top: 1rem;
`
export {
  SelectionWindowStyles,
  SelectionWindowHeaderStyles,
  SelectionWindowMainStyles,
}
