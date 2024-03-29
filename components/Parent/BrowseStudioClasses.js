import { useContext } from 'react'
import { useQuery } from '@apollo/client'
import Cookies from 'js-cookie'
import styled from 'styled-components'

import DanceClassInquiryCard from './DanceClassInquiryCard'
import { ActiveFilters } from './BrowseClassFilter'
import { PARENT_USER_QUERY } from './Queries'
import { useRegistrationContext } from './RegistrationContext'
import Card from '../styles/Card'
import { FilterContext } from '../Studio/FilterContext'

// import RequestAccessButton from './RequestAccessButton'
// import LinkDancerToStudioButton from "./LinkDancerToStudioButton";
// import SoloDuoTrioSubscribe from "./SoloDuoTrioSubscribe";

const ClassListCard = styled(Card)`
  background: ${(props) => props.theme.gray0};
  width: 97%;
  max-width: 900px;
  box-shadow: none;
  margin-top: -2px;
  border: 2px solid ${(props) => props.theme.indigo7};
`
const DancerTabs = styled(Card)`
  display: flex;
  align-items: center;
  box-shadow: none;
  margin-bottom: 0;
  padding: 0;
  background: transparent;
`
const Tab = styled.div`
  width: auto;
  max-width: 150px;
  min-width: 50px;
  border-radius: 5px 5px 0 0;
  margin: 0 1px 0 0;
  color: ${(props) =>
    props.active ? props.theme.highlightedText : props.theme.blackText};
  background-color: ${(props) =>
    props.active ? props.theme.gray0 : props.theme.gray1};
  /* zIndex so it will drop down over studio offerings  to create a tab-effect */
  z-index: 99;

  button {
    background: inherit;
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    //tab effect: border radius and colored edges when active
    border-radius: 5px 5px 0 0;
    border-top: 2px solid
      ${(props) => (props.active ? props.theme.indigo7 : 'none')};
    border-right: 2px solid
      ${(props) => (props.active ? props.theme.indigo7 : 'none')};
    border-left: 2px solid
      ${(props) => (props.active ? props.theme.indigo7 : 'none')};
    border-bottom: 2px solid
      ${(props) => (props.active ? 'none' : props.theme.indigo7)};
    :hover {
      color: ${(props) => props.theme.indigo9};
    }
    :focus {
      outline: ${(props) => (props.active ? 'none' : 'auto')};
      background-color: ${(props) => props.theme.gray0};
    }
  }
`
const BrowsingHeader = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-bottom: 10px;
  place-items: center;
`
const LargeScreenActiveFilters = styled(ActiveFilters)`
  h2 {
    font-size: 1rem;
  }
  margin-bottom: 0.5rem;
  @media (min-width: ${(props) => props.theme.largeScreen}) {
    h2 {
      font-size: 1.25rem;
    }
    display: block;
  }
`

const FiltersDisplay = styled.div`
  text-align: left;
  display: flex;
  align-items: center;
`
function BrowseStudioClasses({ studio, dancer }) {
  const { filter: classFilter } = useContext(FilterContext)
  const { browsingDancerId, setBrowsingDancer } = useRegistrationContext()

  const { data: parentData, loading, error } = useQuery(PARENT_USER_QUERY)
  const parentUser = parentData ? parentData.parentUser : {}

  // const isParentLinkedToStudio =
  //   parentUser.studios &&
  //   parentUser.studios.some((parentStudio) => parentStudio.id === studio.id)

  function compareDanceToFilter(danceClass, classFilter) {
    let pass = true
    const filterCategories = Object.keys(classFilter)
    filterCategories.forEach((category) => {
      if (!classFilter[category].includes(danceClass[category])) {
        pass = false
      }
    })
    return pass
  }

  const filteredClasses = studio.danceClasses
    ? studio.danceClasses.filter((danceClass) =>
        compareDanceToFilter(danceClass, classFilter)
      )
    : []

  const activeFilters = [].concat.apply([], Object.values(classFilter))
  const requestIds = dancer.requests
    ? dancer.requests.map((request) => request.classRequested.id)
    : []

  return (
    <div>
      <DancerTabs>
        {parentUser.dancers &&
          parentUser.dancers.map((dancer) => (
            <Tab
              key={dancer.firstName}
              active={dancer.id === browsingDancerId ? true : false}
            >
              <button
                active={dancer.id === browsingDancerId ? true : false}
                onClick={() => setBrowsingDancer(dancer.id)}
              >
                {dancer.firstName}
              </button>
            </Tab>
          ))}
      </DancerTabs>
      <ClassListCard>
        <BrowsingHeader>
          <p>
            The following dance classes are available at {studio.studioName}
          </p>
        </BrowsingHeader>
        {/*display a list of the active filters */}
        <LargeScreenActiveFilters>
          {Object.keys(classFilter).length > 0 && (
            <FiltersDisplay>
              <h2>Active Filters:</h2>
              <ul>
                {activeFilters.map((choice) => (
                  <li key={choice}>{choice}</li>
                ))}
              </ul>
            </FiltersDisplay>
          )}
        </LargeScreenActiveFilters>

        {filteredClasses.map((dance) => {
          if (dance.size === 'Group') {
            return (
              <DanceClassInquiryCard
                parentEmail={parentUser.email}
                dancerName={dancer.firstName}
                dance={dance}
                dancerId={browsingDancerId}
                studioId={studio.id}
                key={dance.id}
                requested={requestIds.includes(dance.id)}
                request={dancer.requests?.filter(
                  (request) => request.classRequested.id === dance.id
                )}
              />
            )
          }
        })}
      </ClassListCard>
    </div>
  )
}
export default BrowseStudioClasses

{
  /* {!isParentLinkedToStudio &&
            !parentUser.accessRequests.includes(studio.id) && (
              <>
                <p>
                  If your classes are not listed here, you can request access to
                  the studio's notes
                </p>
                <RequestAccessButton
                  accessRequests={parentUser.accessRequests}
                  parentEmail={parentUser.email}
                  studioId={studio.id}
                />
              </>
            )}
          {parentUser.accessRequests.includes(studio.id) && (
            <RequestNotice>Notes are requested from this studio</RequestNotice>
          )} */
}
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
