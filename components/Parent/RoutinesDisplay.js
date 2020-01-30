import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";

import DanceCard from "./DanceCard";
import { Query } from "react-apollo";
import { ALL_Rs } from "./Queries";
import Error from "../Error";
import { ParentDisplayConsumer } from "../../components/ParentDisplayProvider";
import SearchForStudio from "../SearchForStudio";

//query all dances where ids of parents dancers are in the ids of enrolled dancers for the dance.  On the server, filter out all dancers not belonging to this parent.
const NoRoutinesDiv = styled.div`
  padding-top: 5rem;
  display: grid;
  grid-gap: 20px;
  justify-items: center;
`;
class RoutinesDisplay extends Component {
  render() {
    return (
      <ParentDisplayConsumer>
        {({
          hiddenDances,
          hiddenDancers,
          hiddenStudios,
          hiddenIndependents
        }) => {
          return (
            <Query query={ALL_Rs}>
              {({ data, error, loading }) => {
                if (error) return <Error error={error} />;
                if (loading) return <p>5, 6, 7, 8 ...</p>;

                const allRs = data ? data.allRs : {};
                if (allRs.length < 1) {
                  return (
                    <NoRoutinesDiv>
                      <p>You have no routines to display</p>
                      <Link href="parent/createCustomRoutine">
                        <a className="btn-action-primary">
                          Create Your Own Routine
                        </a>
                      </Link>
                      <p>Find a Studio to Browse or Request Notes</p>
                      <SearchForStudio
                        // setBrowsingDancer={this.props.dancerIds[0]}
                        // dancerName={this.props.dancers[0].firstName}
                        dancerId={this.props.dancerIds[0]}
                      />
                    </NoRoutinesDiv>
                  );
                }

                for (const dance of allRs) {
                  const dancerIds = [];
                  for (const dancer of dance.dancers) {
                    dancerIds.push(dancer.id);
                  }
                  dance.dancerIds = dancerIds;
                }

                const visibleDancersIds = this.props.dancerIds.filter(
                  id => !hiddenDancers.includes(id)
                );

                return (
                  <>
                    {allRs &&
                      allRs.map(dance => {
                        //independent dances...
                        if (!dance.studio) {
                          if (
                            hiddenIndependents.includes("all") ||
                            dance.dancerIds.some(dancerId =>
                              hiddenIndependents.includes(dancerId)
                            )
                          ) {
                            return null;
                          }
                          if (
                            !hiddenDances.includes(dance.id) &&
                            visibleDancersIds.some(visibleDancerId =>
                              dance.dancerIds.includes(visibleDancerId)
                            )
                          ) {
                            return (
                              <DanceCard
                                visibleDancersIds={visibleDancersIds}
                                key={dance.id}
                                dance={dance}
                              />
                            );
                          }
                        }
                        //all other dances ( linked with a studio & studioId)
                        {
                          /* !hiddenStudios.includes(dance.studio.id) && */
                        }
                        {
                          if (
                            dance.studio &&
                            !hiddenDances.includes(dance.id) &&
                            !hiddenStudios.includes(dance.studio.id) &&
                            visibleDancersIds.some(visibleDancerId =>
                              dance.dancerIds.includes(visibleDancerId)
                            )
                          ) {
                            return (
                              <DanceCard
                                visibleDancersIds={visibleDancersIds}
                                key={dance.id}
                                dance={dance}
                              />
                            );
                          }
                        }
                      })}
                  </>
                );
              }}
            </Query>
          );
        }}
      </ParentDisplayConsumer>
    );
  }
}

export default RoutinesDisplay;
