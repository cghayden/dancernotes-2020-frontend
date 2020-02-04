import React, { Component } from "react";
import styled from "styled-components";
import { ParentDisplayConsumer } from "../../components/ParentDisplayProvider";

const ActiveDancerButton = styled.button`
  justify-self: center;
  background: transparent;
  color: ${props => props.theme.indigo9};
  margin: 0.5rem 0;
  padding: 0;
  border-radius: 50%;
  border: none;
  :active {
    transform: translate3d(5px, 5px, 0);
  }
  :hover {
    background: inherit;
    color: ${props => props.theme.indigo8};
  }
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }
  p {
    font-size: 1.4rem;
  }
`;
const InActiveDancerButton = styled.button`
  justify-self: center;
  color: ${props => props.theme.gray4};
  padding: 0;
  border-radius: 50%;
  border: none;
  :active {
    transform: translate3d(5px, 5px, 0);
  }
  :hover {
    background: inherit;
    color: ${props => props.theme.indigo8};
  }

  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    filter: grayscale(85%);
    object-fit: cover;
  }
  p {
    font-size: 1.3rem;
  }
`;

export default class DancerToggler extends Component {
  render() {
    const { dancer } = this.props;
    return (
      <ParentDisplayConsumer>
        {({ hiddenDancers, toggleDancer }) => {
          if (hiddenDancers.includes(dancer.id)) {
            return (
              <InActiveDancerButton
                onClick={() => {
                  toggleDancer(dancer.id, hiddenDancers);
                }}
              >
                {dancer.avatar ? (
                  <img src={dancer.avatar} alt={dancer.firstName} />
                ) : (
                  <p>{dancer.firstName}</p>
                )}
              </InActiveDancerButton>
            );
          }
          return (
            <ActiveDancerButton
              onClick={() => {
                toggleDancer(dancer.id, hiddenDancers);
              }}
            >
              {dancer.avatar ? (
                <img src={dancer.avatar} alt={dancer.firstName} />
              ) : (
                <p>{dancer.firstName}</p>
              )}
            </ActiveDancerButton>
          );
        }}
      </ParentDisplayConsumer>
    );
  }
}
