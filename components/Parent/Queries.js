import gql from "graphql-tag";

//query apollo client for list of active dancers displayed.
const ALL_Rs = gql`
  query {
    allRs {
      id
      name
      performanceName
      day
      startTime
      endTime
      shoes
      tights
      notes
      music
      parentsNotes
      dancers {
        id
        firstName
        avatar
      }
      studio {
        id
      }
    }
  }
`;

const PARENTS_EVENTS_QUERY = gql`
  query {
    parentUser {
      dancers {
        studios {
          events {
            name
            type
            appliesTo
          }
        }
      }
    }
  }
`;

const PARENT_USER_QUERY = gql`
  query {
    parentUser {
      firstName
      lastName
      id
      email
      dancersIds
      dancers {
        id
        firstName
        avatar
        # todo: remove when changing dancers page query
        existingAvatarId
        studios {
          studioName
          id
          events {
            type
            name
            appliesTo
          }
        }
        danceClasses {
          id
          name
          studio {
            id
          }
        }
      }
    }
  }
`;

const HIDDEN_DANCERS_QUERY = gql`
  query {
    hiddenDancers @client
  }
`;

const PARENTS_STUDIOS = gql`
  query PARENTS_STUDIOS {
    parentStudios {
      studioName
      id
    }
  }
`;

const PARENTS_DANCERS = gql`
  query PARENTS_DANCERS {
    parentsDancers {
      firstName
    }
  }
`;

export {
  HIDDEN_DANCERS_QUERY,
  PARENTS_STUDIOS,
  PARENT_USER_QUERY,
  ALL_Rs,
  PARENTS_EVENTS_QUERY,
  PARENTS_DANCERS
};
