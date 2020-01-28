import gql from "graphql-tag";

//query apollo client for list of active dancers displayed.
const ALL_Rs = gql`
  query {
    allRs {
      custom
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
      parentsNotes {
        note
        id
      }
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
      id
      studios {
        id
        events {
          name
          type
          appliesTo
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
      customRoutines {
        id
        name
        studio {
          id
        }
      }
      studios {
        id
        studioName
      }
      dancers {
        id
        firstName
        avatar
        avatarId
        # todo: remove when changing dancers page query
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
      accessRequests
    }
  }
`;

const STUDIOS_AND_DANCERS = gql`
  query {
    parentUser {
      id
      dancers {
        id
        firstName
      }
      studios {
        id
        studioName
      }
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

const CUSTOM_ROUTINE_QUERY = gql`
  query CUSTOM_ROUTINE_QUERY($id: ID!) {
    customRoutine(where: { id: $id }) {
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
    }
  }
`;
const DANCER_QUERY = gql`
  query DANCER_QUERY($id: ID!) {
    dancer(where: { id: $id }) {
      id
      firstName
      avatar
      danceClasses {
        id
        name
        studio {
          id
        }
      }
      customRoutines {
        id
        name
        studio {
          id
        }
      }
      studios {
        id
        studioName
      }
      requests {
        id
        classesRequested {
          id
        }
      }
    }
  }
`;
export {
  PARENT_USER_QUERY,
  DANCER_QUERY,
  ALL_Rs,
  PARENTS_EVENTS_QUERY,
  PARENTS_DANCERS,
  CUSTOM_ROUTINE_QUERY,
  STUDIOS_AND_DANCERS
};
