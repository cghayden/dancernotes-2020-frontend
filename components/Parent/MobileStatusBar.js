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
  z-index: 1000;
  place-items: center;
  justify-content: space-between;
  padding-left: 1rem;

  @media (min-width: ${props => props.theme.largeScreen}) {
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 1.4rem;
`;
const Actions = styled.div`
  margin-left: auto;
`;
function MobileStatusBar(props) {
  // todo : get active dancers and display avatars?
  const { page, action } = props;

  return (
    <MobileStatusBarStyles>
      <Title>{page}</Title>
      {/* {avatars && <Avatars dancers={[Dancer]} />} */}
      <Actions>{action}</Actions>
    </MobileStatusBarStyles>
  );
}

MobileStatusBar.propTypes = {
  dancers: PropTypes.array,
  page: PropTypes.string.isRequired
};

export default MobileStatusBar;
