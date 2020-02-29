import gql from "graphql-tag";

//query apollo client for list of active dancers displayed.
const ALL_Rs = gql`
  query {
    allRs {
      id
      style
      competitiveLevel
      ageDivision
      name
      performanceName
      day
      startTime
      endTime
      shoes
      tights
      notes
      music
      custom
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
      entryNumber
      entryDay
      entryTime
    }
  }
`;

const PARENT_EVENTS_QUERY = gql`
  query {
    parentEvents {
      id
      name
      type
      appliesTo
      beginDate
      endDate
      location
      address1
      address2
      city
      state
      zip
      url
      notes
      studio {
        id
        studioName
      }
    }
  }
`;

const CUSTOM_EVENTS_QUERY = gql`
  query {
    customEvents {
      id
      name
      type
      appliesTo
      beginDate
      endDate
      location
      address1
      address2
      city
      state
      zip
      url
      notes
      studio {
        id
        studioName
      }
      dancerIds
    }
  }
`;

const PARENT_USER_QUERY = gql`
  query {
    parentUser {
      firstName
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
        danceClasses {
          id
          name
          studio {
            id
          }
          custom
        }
        customRoutines {
          id
          name
          studio {
            id
          }
          custom
        }
        studios {
          id
          studioName
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
      style
      ageDivision
      competitiveLevel
      entryNumber
      entryDay
      entryTime
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
        custom
      }
      customRoutines {
        id
        name
        studio {
          id
        }
        custom
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
const PARENTS_MAKEUP_QUERY = gql`
  query PARENTS_MAKEUP_QUERY {
    parentMakeup {
      studios {
        id
        studioName
        makeupSets {
          id
          name
          lipstick
          eyeShadow
          eyeLids
          eyeCrease
          eyeLiner
          eyelashes
          foundation
          powder
          blush
          bronzer
          notes
        }
      }
    }
  }
`;

const STUDIO_CARD_QUERY = gql`
  query STUDIO_CARD_QUERY {
    parentUser {
      id
      studios {
        id
        studioName
        website
      }
      dancers {
        id
        firstName
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
      }
    }
  }
`;

export {
  PARENT_USER_QUERY,
  DANCER_QUERY,
  ALL_Rs,
  PARENT_EVENTS_QUERY,
  PARENTS_DANCERS,
  CUSTOM_ROUTINE_QUERY,
  STUDIOS_AND_DANCERS,
  PARENTS_MAKEUP_QUERY,
  CUSTOM_EVENTS_QUERY,
  STUDIO_CARD_QUERY
};
