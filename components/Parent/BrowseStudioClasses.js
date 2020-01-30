import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import DanceClassInquiryCard from "./DanceClassInquiryCard";
import SoloDuoTrioSubscribe from "./SoloDuoTrioSubscribe";
import LinkDancerToStudioButton from "./LinkDancerToStudioButton";
import styled from "styled-components";
import { PARENT_USER_QUERY } from "./Queries";

import { ActiveFilters } from "./BrowseClassFilter";
import { DANCER_QUERY } from "./Queries";
import { REQUEST_STUDIO_ACCESS } from "./Mutations";
import { RegistrationContext } from "./RegistrationContext";
import Cookies from "js-cookie";
import Card from "../styles/Card";

// 1. get all classes from studio
//2. get filters
//3. filter classes array
//4. render classes
const ClassListCard = styled(Card)`
  background: ${props => props.theme.gray0};
  max-width: 900px;
  box-shadow: none;
  margin-top: -2px;
  /* border-radius:  5px 5px 5px; */
`;
const DancerTabs = styled(Card)`
  display: flex;
  align-items: center;
  box-shadow: none;
  margin-bottom: 0;
  padding: 0;
  background: transparent;
`;
const Tab = styled.div`
    width: auto;
    max-width: 150px;
    min-width: 50px;
    border-radius: 5px 5px 0 0;
    margin: 0 1px 0 0;
    color: ${props =>
      props.active ? props.theme.highlightedText : props.theme.blackText};
    /* border-style: solid;
    border-color: ${props =>
      props.active ? props.theme.gray0 : "transparent"}; */
    /* border-width: ${props => (props.active ? `2px 2px 0 2px` : `0`)}; */
    background-color: ${props =>
      props.active ? props.theme.gray0 : props.theme.gray1};
    /* :hover {
      background-color: ${props => props.theme.gray1};
    } */
    button {
      background: inherit;
      margin: 0;
      overflow: hidden;
      white-space: nowrap;
      width: 100%;
      :hover {
        color: ${props => props.theme.indigo9};
      }
      :focus {
        outline: ${props => (props.active ? "none" : "auto")};
        background-color: ${props => props.theme.gray0};
        /* color: ${props => (props.active ? "inherit" : props.theme.teal9)}; */
      }
    }
  `;

const BrowsingHeader = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 1rem;
`;
const LargeScreenActiveFilters = styled(ActiveFilters)`
  h2 {
    font-size: 1rem;
  }
  margin-bottom: 0.5rem;
  @media (min-width: ${props => props.theme.largeScreen}) {
    h2 {
      font-size: 1.25rem;
    }
    display: block;
  }
`;

function BrowseStudioClasses({ classFilter, studio }) {
  const BrowsingContext = useContext(RegistrationContext);
  const setBrowsingDancer = BrowsingContext.setBrowsingDancer;

  //get browsing dancer from cookies so it will still be available if page is refreshed
  const activeDancerId = Cookies.get("browsingDancerId");
  // const activeDancerName = Cookies.get("browsingDancerName");

  const { data: parentData } = useQuery(PARENT_USER_QUERY);
  const parentUser = parentData ? parentData.parentUser : {};

  const { data: dancerData } = useQuery(DANCER_QUERY, {
    variables: { id: activeDancerId }
  });
  const dancer = dancerData ? dancerData.dancer : {};

  function compareDanceToFilter(danceClass, filter) {
    let pass = true;
    const danceClassValues = Object.values(danceClass);
    const filterCategories = Object.keys(filter);
    filterCategories.forEach(category => {
      if (!filter[category].includes(danceClass[category])) {
        pass = false;
      }
    });
    return pass;
  }

  const filteredClasses = studio.danceClasses
    ? studio.danceClasses.filter(danceClass =>
        compareDanceToFilter(danceClass, classFilter)
      )
    : [];

  const activeFilters = [].concat.apply([], Object.values(classFilter));

  return (
    <>
      <p>Browse for:</p>

      <DancerTabs>
        {parentUser.dancers &&
          parentUser.dancers.map(dancer => (
            <Tab
              key={dancer.firstName}
              active={dancer.id === activeDancerId ? true : false}
            >
              <button onClick={() => setBrowsingDancer(dancer.id)}>
                {dancer.firstName}
              </button>
            </Tab>
          ))}
      </DancerTabs>
      <ClassListCard>
        <BrowsingHeader>
          <p>
            {/* To register {activeDancerName} for classes, or manage classes he/she */}
            To register {dancer.firstName} for classes, or manage classes he/she
            is enrolled in or has requested, follow the links below.
          </p>
        </BrowsingHeader>
        <LargeScreenActiveFilters>
          {/*display a list of the active filters */}
          {Object.keys(classFilter).length > 0 && (
            <>
              <div>
                <h2>Active Filters:</h2>
              </div>

              <ul>
                {activeFilters.map(choice => (
                  <li key={choice}>{choice}</li>
                ))}
              </ul>
            </>
          )}
        </LargeScreenActiveFilters>

        {filteredClasses.map(dance => {
          if (dance.size === "Group") {
            return (
              <DanceClassInquiryCard
                dancerName={dancer.firstName}
                // dancerName={activeDancerName}
                dance={dance}
                dancerId={activeDancerId}
                studioId={studio.id}
                key={dance.id}
                requested={
                  dancer.requests &&
                  dancer.requests.classesRequested
                    .map(classRequested => classRequested.id)
                    .includes(dance.id)
                }
                dancersRequestsId={dancer.requests && dancer.requests.id}
              />
            );
          }
        })}
      </ClassListCard>
    </>
  );
}
export default BrowseStudioClasses;

// todo - 1. where and how to include options below .. when a studio has a dancer registered in a solo/duo/trio and the parent has not subscribed,
// todo -2. when the studio has the dancers information and contact but the dancer is not registered for any classes

// {filteredClasses &&
//   filteredClasses.map(dance => {
//     if (dance.size !== "Group") {
//       for (const classDancer of dance.dancers) {
//         //TODO for duo/trio: check if props.dancerId is in the list of dancers?
//         if (classDancer.id === props.dancerId) {
//           return (
//             <SoloDuoTrioSubscribe
//               dance={dance}
//               dancer={dancer}
//               studioId={studio.id}
//               key={dance.id}
//             />
//           );
//         }
//       }
//     }
//   })}

{
  // const studioIds = [];
  // if (dancer.studios) {
  //   for (const studio of dancer.studios) {
  //     studioIds.push(studio.id);
  //   }
  // }
  /* <Card>
                      {studioIds.includes(this.props.studioId) ? (
                        <div>
                          <p>
                            {studio.studioName} has {dancer.firstName}'s
                            information.
                          </p>
                          <p>
                            You will receive an email when {dancer.firstName} is
                            registered for a class, or you can request
                            enrollment to a class below.
                          </p>
                        </div>
                      ) : (
                        <div>
                          <h4>
                            If {dancer.firstName} will not be enrolling in any
                            Group Classes, Submit your Dancer's Information to{" "}
                            {studio.studioName} here.
                          </h4>
                          <LinkDancerToStudioButton
                            dancerId={this.props.dancerId}
                            studioId={this.props.studioId}
                          />
                        </div>
                      )}
                    </Card> */
}
// async function sendRequest() {
//   parentUser.accessRequests.push(studio.id);
//   await requestStudioAccess({
//     variables: {
//       studioId: studio.id,
//       accessRequests: parentUser.accessRequests
//     }
//   });
// }
{
  /* {!parentUser.accessRequests.includes(studio.id) && (
        <>
          <p>
            If you are keeping your own notes, you can request access to the
            studios Hair, Makeup and Event notes.
          </p>
          <button
            type="button"
            disabled={loadingAccessRequest}
            onClick={sendRequest}
          >
            Request Studio Notes
          </button>
        </>
      )}
      {parentUser.accessRequests.includes(studio.id) && (
        <p>Access to studio has been requested</p>
      )} */
}
