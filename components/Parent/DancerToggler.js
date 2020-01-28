import React, { Component } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { ParentDisplayConsumer } from "../../components/ParentDisplayProvider";

const ActiveDancerButton = styled.button`
  justify-self: center;
  color: ${props => props.theme.indigo9};
  width: 60px;
  height: 60px;
  margin: 0.5rem 0;
  padding: 0;
  border-radius: 50%;
  border: none;
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  p {
    font-size: 1.4rem;
  }
`;
const InActiveDancerButton = styled.button`
  justify-self: center;
  color: ${props => props.theme.gray3};
  padding: 0;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    filter: grayscale(85%);
  }
  p {
    font-size: 1rem;
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
