import React from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { DANCER_QUERY } from "./Queries";
import Error from "../../components/Error";

const ClassListing = styled.div`
  background: ${props => props.theme.gray0};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.dropShadowPizzazz};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  justify-items: center;
  margin-bottom: 2rem;
  padding: 1rem 0;
`;

const DanceClassInfo = styled.div`
  color: ${props => props.theme.gray7};
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
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
padding-top: .5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    font-size: 0.875rem;
    /* background-color: ${props => props.theme.vividBlue1}; */
    :disabled{
      background: none;
      color: ${props => props.theme.gray5};
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

function DanceClassInquiryCard({
  dance,
  dancerId,
  dancersRequestsId,
  requested,
  studioId,
  dancerName
}) {
  const [
    removeClassFromRequest,
    { error: errorRemovingRequest, loading: removeRequestLoading }
  ] = useMutation(REMOVE_CLASS_FROM_REQUESTS, {
    variables: { requestId: dancersRequestsId, danceClassId: dance.id }
    // refetchQueries: [{ query: DANCER_QUERY, variables: { id: dancerId } }]
  });

  const [
    requestDance,
    { error: errorRequestingDance, loading: requestingDance }
  ] = useMutation(ADD_DANCE_TO_REQUESTS, {
    variables: {
      requestId: dancersRequestsId || "new",
      danceId: dance.id,
      dancerId: dancerId,
      studioId: studioId
    },
    refetchQueries: [{ query: DANCER_QUERY, variables: { id: dancerId } }]
  });
  const loading = requestingDance || removeRequestLoading;
  const error = errorRequestingDance || errorRemovingRequest;
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

  function getStatus(enrolled, requested, dancerName) {
    if (enrolled) {
      // const text = `${dancerName} is Enrolled in This Class`;
      return "enrolled";
    }
    if (requested) {
      // const text = `${dancerName} has Requested This Class`;
      return "requested";
    } else {
      return "available";
    }
  }
  const enrolled = isEnrolled(dancerId, dance.dancers);
  const status = getStatus(enrolled, requested, dancerName);

  function withdrawFromClass() {
    if (
      confirm(
        "are you sure you want to withdraw from this class? You will be removed from the class and will lose access to the notes for the class."
      )
    ) {
      console.log("confirmed removal");
    } else {
      console.log("not confirmed - keep class");
    }
  }

  return (
    <ClassListing>
      <DanceClassInfo>
        <DanceClassName>{dance.name}</DanceClassName>
        <p>
          <span>{dance.ageDivision}</span>
          {"  "}
          <span>{dance.competitiveLevel}</span>
          {"  "}
          <span>{dance.style}</span>
        </p>
        <DanceClassTime>
          {dance.day && <Day>{dance.day}</Day>}
          <p>
            {dance.startTime && <span>{dance.startTime}</span>}
            {dance.endTime && <span>{` - ${dance.endTime}`}</span>}
          </p>
        </DanceClassTime>
        {removeRequestLoading && <p>Removing request...</p>}
        {loading && <p>Submitting request...</p>}
        {error && <Error error={error} />}
      </DanceClassInfo>
      <DanceClassOptions>
        {status === "available" && (
          <button
            className="btn-action-primary"
            disabled={loading}
            onClick={async () => {
              await requestDance();
            }}
          >
            Enroll
          </button>
        )}
        {status === "requested" && (
          <div>
            <p>Requested for {dancerName}</p>
            <button
              className="btn-danger"
              onClick={async () => await removeClassFromRequest()}
            >
              Cancel
            </button>
          </div>
        )}
        {status === "enrolled" && (
          <div>
            <p>{dancerName} is enrolled</p>
            <button className="btn-danger" onClick={() => withdrawFromClass()}>
              Withdraw
            </button>
          </div>
        )}
      </DanceClassOptions>
    </ClassListing>
  );
}

export default DanceClassInquiryCard;
