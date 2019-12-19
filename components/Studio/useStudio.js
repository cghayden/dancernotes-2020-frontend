import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const STUDIO_USER_QUERY = gql`
  query STUDIO_USER_QUERY {
    myStudio {
      id
      email
      studioName
      styles
      levels
      divisions
      danceClasses {
        id
        name
      }
      makeupSets {
        name
      }
    }
  }
`;

function useStudio() {
  const { data } = useQuery(STUDIO_USER_QUERY);
  if (data) return data.myStudio;
  return null;
}

export { useStudio, STUDIO_USER_QUERY };
