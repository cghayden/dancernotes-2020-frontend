import gql from "graphql-tag";

const SINGLE_DANCE_QUERY = gql`
  query SINGLE_DANCE_QUERY($id: ID!) {
    danceClass(where: { id: $id }) {
      id
      name
      style
      competitiveLevel
      ageDivision
      day
      startTime
      endTime
      shoes
      tights
      notes
      music
      performanceName
      size
      dancers {
        id
        firstName
      }
    }
  }
`;

const CATEGORIES_QUERY = gql`
  query CATEGORIES_QUERY {
    studioCategories {
      styles
      competitiveLevels
      ageDivisions
      makeupSets {
        name
        id
      }
    }
  }
`;

const ALL_DANCE_CLASSES_QUERY = gql`
  query ALL_DANCE_CLASSES_QUERY {
    allStudioDanceClasses {
      id
      name
      music
      performanceName
      day
      startTime
      endTime
      competitiveLevel
      style
      ageDivision
      tights
      shoes
      notes
      dancers {
        firstName
      }
      size
    }
  }
`;

const STUDIO_ALL_DANCERS_QUERY = gql`
  query STUDIO_ALL_DANCERS_QUERY {
    studioDancers {
      id
      firstName
      parent {
        id
        firstName
        email
      }
      danceClasses {
        name
      }
    }
  }
`;

const ENROLLMENT_REQUESTS_QUERY = gql`
  query ENROLLMENT_REQUESTS_QUERY {
    enrollmentRequests {
      id
      parent {
        id
      }
      dancer {
        id
        firstName
      }
      classesRequested {
        id
        name
      }
    }
  }
`;

const STUDIO_EVENTS_QUERY = gql`
  query STUDIO_EVENTS_QUERY {
    myStudio {
      id
      events {
        name
        type
        appliesTo
        beginDate
        endDate
        location
        street1
        city
        state
        zip
        url
        notes
      }
    }
  }
`;

export {
  CATEGORIES_QUERY,
  ALL_DANCE_CLASSES_QUERY,
  STUDIO_ALL_DANCERS_QUERY,
  SINGLE_DANCE_QUERY,
  ENROLLMENT_REQUESTS_QUERY,
  STUDIO_EVENTS_QUERY
};
