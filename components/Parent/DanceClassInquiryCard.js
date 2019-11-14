import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { DANCER_QUERY } from "./DancerQuery";
import Error from "../../components/Error";
import Card from "../styles/Card";

const InquiryCard = styled(Card)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const DanceClassInfo = styled.div`
  color: ${props => props.theme.gray7};
  display: grid;
  grid-template-columns: 1fr;
`;

const DanceClassName = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.gray9};
`;

const DanceClassTime = styled.div`
  display: flex;

  flex-wrap: nowrap;
`;

const Day = styled.p`
  padding-right: 0.5rem;
`;

const DanceClassOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    font-size: 0.875rem;
    background-color: ${props => props.theme.vividBlue1};
    :disabled {
      background: none;
      color: ${props => props.theme.red5};
    }
  }
`;

const ADD_DANCE_TO_REQUESTS = gql`
  mutation ADD_DANCE_TO_REQUESTS(
    $requestId: ID!
    $danceId: ID!
    $dancerId: ID!
    $studioId: ID!
  ) {
    requestDance(
      requestId: $requestId
      danceId: $danceId
      dancerId: $dancerId
      studioId: $studioId
    ) {
      id
      classesRequested {
        name
      }
    }
  }
`;

const REMOVE_CLASS_FROM_REQUESTS = gql`
  mutation REMOVE_CLASS_FROM_REQUESTS($requestId: ID!, $danceClassId: ID!) {
    removeClassFromRequest(requestId: $requestId, danceClassId: $danceClassId) {
      message
    }
  }
`;

//check to see if dancerId is in array of dancers
function isEnrolled(dancerId, dancers) {
  let dancersInDance = [];
  for (const dancer of dancers) {
    dancersInDance.push(dancer.id);
  }
  if (dancersInDance.includes(dancerId)) {
    return true;
  } else {
    return false;
  }
}

function getButtonStatus(enrolled, requested, dancerName) {
  if (enrolled === true) {
    const text = `${dancerName} is Enrolled in This Class`;
    return { text, disabled: true, status: "enrolled" };
  }
  if (requested === true) {
    const text = `${dancerName} has Requested This Class`;
    return { text, disabled: true, status: "requested" };
  } else {
    return { text: "ENROLL", disabled: false, status: "none" };
  }
}

export default class DanceClassInquiryCard extends Component {
  static propTypes = {
    dance: PropTypes.object.isRequired,
    dancerId: PropTypes.string.isRequired,
    dancersRequestsId: PropTypes.string,
    requested: PropTypes.bool,
  };

  render() {
    const {
      dance,
      dancerId,
      dancersRequestsId,
      requested,
      studioId,
      dancerName,
    } = this.props;

    const enrolled = isEnrolled(dancerId, dance.dancers);
    const buttonStatus = getButtonStatus(enrolled, requested, dancerName);

    return (
      <Mutation
        mutation={REMOVE_CLASS_FROM_REQUESTS}
        variables={{ requestId: dancersRequestsId, danceClassId: dance.id }}
        refetchQueries={[{ query: DANCER_QUERY, variables: { id: dancerId } }]}
      >
        {(
          removeClassFromRequest,
          { error: removeRequestError, loading: removeRequestLoading },
        ) => (
          <Mutation
            mutation={ADD_DANCE_TO_REQUESTS}
            variables={{
              requestId: dancersRequestsId || "new",
              danceId: dance.id,
              dancerId: dancerId,
              studioId: studioId,
            }}
            refetchQueries={[
              { query: DANCER_QUERY, variables: { id: dancerId } },
            ]}
          >
            {(requestDance, { error, loading }) => (
              <InquiryCard>
                <DanceClassInfo>
                  <DanceClassName>{dance.name}</DanceClassName>
                  <p>
                    Ages: <span>( dance.ages )</span>
                  </p>
                  <DanceClassTime>
                    <Day>{dance.day}</Day>

                    <p>
                      <span>{dance.startTime}</span> -{" "}
                      <span>{dance.endTime}</span>
                    </p>
                  </DanceClassTime>
                  {removeRequestLoading && <p>Removing request...</p>}
                  {loading && <p>Submitting request...</p>}
                  {error && <Error error={error} />}
                  {removeRequestError && <Error error={removeRequestError} />}
                </DanceClassInfo>
                <DanceClassOptions>
                  <button
                    disabled={buttonStatus.disabled || loading}
                    onClick={async () => {
                      await requestDance();
                    }}
                  >
                    {buttonStatus.text}
                  </button>
                  {buttonStatus.status === "requested" && (
                    <button
                      onClick={async () => await removeClassFromRequest()}
                    >
                      Cancel Request
                    </button>
                  )}
                </DanceClassOptions>
              </InquiryCard>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}
