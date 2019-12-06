import React, { Component } from "react";
import DanceCard from "./DanceCard";
import { Query } from "react-apollo";
import { ALL_Rs } from "./Queries";
import Error from "../Error";
import { ParentDisplayConsumer } from "../../components/ParentDisplayProvider";

//query all dances where ids of parents dancers are in the ids of enrolled dancers for the dance.  On the server, filter out all dancers not belonging to this parent.

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
                if (loading) return <p>Loading}</p>;

                const allRs = data ? data.allRs : {};
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
                        console.log("dance:", dance);

                        //independent dances...
                        if (!dance.studio) {
                          if (
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
