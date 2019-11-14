import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const COMPETITIONS_QUERY = gql`
  query COMPETITIONS_QUERY {
    parentCompetitions {
      dancers {
        studios {
          events {
            type
            name
            appliesTo
          }
        }
      }
    }
  }
`;

const Competitions = () => {
  // const { data, loading, error } = useQuery(COMPETITIONS_QUERY);
  return <div>Comp Cards</div>;
};

export default Competitions;
