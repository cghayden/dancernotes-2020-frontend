import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";

import DanceCard from "./DanceCard";
import { Query } from "react-apollo";
import { ALL_Rs } from "./Queries";
import Error from "../Error";
import { ParentDisplayConsumer } from "../../components/ParentDisplayProvider";
import SearchForStudio from "../SearchForStudio";
import Card from "../../components/styles/Card";
//query all dances where ids of parents dancers are in the ids of enrolled dancers for the dance.  On the server, filter out all dancers not belonging to this parent.const NoRoutinesDiv = styled.div`

class RoutinesDisplay extends Component {
  state = { showStudioSearch: false };
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
                    <Card>
                      <div className="card__section">
                        <p>
                          Competition Routines and other dance classes your
                          dancers are in will appear here.
                        </p>
                        <p>
                          You can filter the view with the display option above.
                        </p>
                        <p>You currently have no routines to display.</p>
                        <p>You can:</p>
                      </div>
                      <p>
                        Search for a studio to request notes, signup for
                        classes, or browse the studio's class offerings...
                      </p>
                      <button
                        className="btn-action-primary"
                        onClick={() =>
                          this.setState({
                            showStudioSearch: !this.state.showStudioSearch
                          })
                        }
                      >
                        Search for a Studio
                      </button>
                      {this.state.showStudioSearch && (
                        <SearchForStudio dancerId={this.props.dancerIds[0]} />
                      )}
                      <p>- OR -</p>
                      <Link href="/parent/createCustomRoutine">
                        <a className="btn-action-primary">
                          Create your own Routine
                        </a>
                      </Link>
                    </Card>
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
                      allRs
                        .sort(function(a, b) {
                          const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                          const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                          if (nameA < nameB) {
                            return -1;
                          }
                          if (nameA > nameB) {
                            return 1;
                          }
                        })
                        .map(dance => {
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
