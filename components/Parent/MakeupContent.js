import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Card from "../styles/Card";

const MAKEUP_QUERY = gql`
  query MAKEUP_QUERY {
    allRs {
      name
      dancers {
        id
      }
      makeupSet {
        name
        lipstick
        eyeShadow
      }
    }
  }
`;

class MakeupContent extends Component {
  compileMakeupSets = allRoutines => {
    const makeup = {};
    for (const dance of allRoutines) {
      if (dance.makeupSet) {
        const setName = dance.makeupSet.name;
        if (!makeup.hasOwnProperty(setName)) {
          const applyTo = [];
          applyTo.push(dance.name);
          dance.makeupSet.applyTo = applyTo;
          makeup[setName] = dance.makeupSet;
        } else {
          makeup[setName].applyTo.push(dance.name);
        }
      }
    }
    const makeupArray = Object.values(makeup);
    return makeupArray;
  };

  render() {
    return (
      <Query query={MAKEUP_QUERY}>
        {({ data: { allRs } = {}, error, loading }) => {
          if (loading) return <p>loading...</p>;
          if (error) return <p>Error! {error}</p>;
          const makeup = this.compileMakeupSets(allRs);

          return (
            <>
              {makeup.map((makeupSet, index) => {
                return (
                  <Card key={index}>
                    <h2>{makeupSet.name}</h2>
                    <ul>
                      <li>Lipstick: {makeupSet.lipstick}</li>
                      <li>Eye Shadow: {makeupSet.eyeShadow}</li>
                    </ul>
                    <h3>Applies To:</h3>
                    <ul>
                      {makeupSet.applyTo.map(dance => (
                        <li key={dance}>{dance}</li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </>
          );
        }}
      </Query>
    );
  }
}

export default MakeupContent;
