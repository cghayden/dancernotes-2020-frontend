import styled from 'styled-components'

const AvatarStyle = styled.img`
  width: 40px;
  height: 40px;
  width: ${(props) => (props.isDancerHidden ? `30px` : `40px`)};
  height: ${(props) => (props.isDancerHidden ? `30px` : `40px`)};
  filter: ${(props) => (props.isDancerHidden ? `opacity(.4)` : `none`)};
  border-radius: 25px;
  margin: 0 0.25rem;
  object-fit: cover;
  overflow: hidden;
`

const InitialStyle = styled.div`
  /* width: 40px;
  height: 40px; */
  width: ${(props) => (props.isDancerHidden ? `30px` : `40px`)};
  height: ${(props) => (props.isDancerHidden ? `30px` : `40px`)};
  border-radius: 25px;
  margin: 0 0.25rem;
  display: grid;
  place-items: center;
  font-size: ${(props) => (props.isDancerHidden ? `1.4em` : `1.6em`)};
  background-color: ${(props) =>
    props.isDancerHidden ? props.theme.gray2 : props.theme.green7};
  color: ${(props) =>
    props.isDancerHidden ? props.theme.gray4 : props.theme.green0};
`

export { AvatarStyle, InitialStyle }
