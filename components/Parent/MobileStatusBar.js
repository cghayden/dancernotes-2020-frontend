import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const MobileStatusBarStyles = styled.div`
  height: ${props => props.theme.mobileStatusBarHeight};
  width: 100%;
  position: fixed;
  top: 0;
  background-color: ${props => props.theme.gray0};
  display: flex;
  z-index: 100;
  place-items: center;
  justify-content: space-between;
  padding-left: 1rem;

  @media (min-width: ${props => props.theme.largeScreen}) {
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 1rem;
`;
const Actions = styled.div`
  margin-left: auto;
`;
function MobileStatusBar(props) {
  // todo : get active dancers and display avatars?
  const { avatars, dancers, page } = props;

  return (
    <MobileStatusBarStyles>
      <Title>{page}</Title>
      {/* {avatars && <Avatars dancers={dancers} />} */}
      <Actions>{props.children}</Actions>
    </MobileStatusBarStyles>
  );
}

MobileStatusBar.propTypes = {
  dancers: PropTypes.array,
  page: PropTypes.string.isRequired,
};

// const Avatar = styled.div`
//   padding-top: 3px;
//   img {
//     box-shadow: 0px 2px 3px ${props => props.theme.indigo9};
//     width: 40px;
//     height: 40px;
//     border-radius: 25px;
//     align-self: center;
//   }
// `;
// const StyledAvatars = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
//   place-items: center;
// `;
// class Avatars extends Component {
//   render() {
//     const { dancers } = this.props;
//     return (
//       <Query query={HIDDEN_DANCERS_QUERY}>
//         {({ data: { hiddenDancers } = {} }) => {
//           const visibleDancers = dancers.filter(
//             dancer => !hiddenDancers.includes(dancer.id),
//           );
//           return (
//             <StyledAvatars>
//               {visibleDancers.map(dancer => (
//                 <Avatar key={dancer.id}>
//                   {dancer.avatar ? (
//                     <img src={dancer.avatar} />
//                   ) : (
//                     <p>{dancer.firstName}</p>
//                   )}
//                 </Avatar>
//               ))}
//             </StyledAvatars>
//           );
//         }}
//       </Query>
//     );
//   }
// }

// class AvatarBar extends Component {
//   render() {
//     const { dancers } = this.props;
//     return (
//       <Query query={HIDDEN_DANCERS_QUERY}>
//         {({ data: { hiddenDancers } = {} }) => {
//           const visibleDancers = dancers.filter(
//             dancer => !hiddenDancers.includes(dancer.id),
//           );
//           //ONLY AVATAR BAR NEEDS DANCERS QUERY

//           return (
//             <StyledAvatarBar>
//               {visibleDancers.map(dancer => (
//                 <Avatar key={dancer.id}>
//                   {dancer.avatar ? (
//                     <img src={dancer.avatar} />
//                   ) : (
//                     <p>{dancer.firstName}</p>
//                   )}
//                 </Avatar>
//               ))}
//             </StyledAvatarBar>
//           );
//         }}
//       </Query>
//     );
//   }
// }
// AvatarBar.propTypes = {
//   dancers: PropTypes.array.isRequired,
// };

export default MobileStatusBar;
