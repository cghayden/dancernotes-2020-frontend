import styled from 'styled-components'

const Dot = styled.div`
  background: ${(props) => props.theme.red7};
  color: white;
  border-radius: 50%;
  width: 1em;
  height: 1em;
  display: grid;
  place-items: center;
  margin-left: 0.5rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
  @media (min-width: ${(props) => props.theme.largeScreen}) {
    width: 1.25rem;
    height: 1.25rem;
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate3d(0, -50%, 0);
  }
`

const RequestsCount = ({ count }) => <Dot>{count}</Dot>

export default RequestsCount
