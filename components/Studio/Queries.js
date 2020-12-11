import gql from 'graphql-tag'

const STUDIO_USER_QUERY = gql`
  query STUDIO_USER_QUERY {
    myStudio {
      id
      email
      studioName
      styles
      competitiveLevels
      ageDivisions
      danceClasses {
        id
        name
      }
      dancers {
        id
        firstName
      }
      hairStyles {
        id
      }
      makeupSets {
        id
      }
      events {
        id
      }
    }
  }
`
const STUDIO_LINKED_PARENTS = gql`
  query STUDIO_LINKED_PARENTS {
    studioLinkedParents {
      id
      firstName
      lastName
      email
      dancers {
        firstName
        lastName
        id
      }
    }
  }
`

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
`

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
`

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
      entryNumber
      entryDay
      entryTime
      dancers {
        firstName
      }
      size
    }
  }
`

const STUDIO_ALL_DANCERS_QUERY = gql`
  query STUDIO_ALL_DANCERS_QUERY {
    studioDancers {
      id
      firstName
      lastName
      parent {
        id
        firstName
        lastName
        email
      }
      danceClasses {
        studio {
          id
        }
        id
        name
        competitiveLevel
        ageDivision
        style
        day
        performanceName
        tights
        shoes
      }
    }
  }
`

const ENROLLMENT_REQUESTS_QUERY = gql`
  query ENROLLMENT_REQUESTS_QUERY {
    enrollmentRequests {
      id
      parent {
        firstName
        lastName
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
`
const ACCESS_REQUESTS_QUERY = gql`
  query ACCESS_REQUESTS_QUERY {
    accessRequests {
      id
      parent {
        id
        firstName
        lastName
      }
    }
  }
`

const STUDIO_EVENTS_QUERY = gql`
  query STUDIO_EVENTS_QUERY {
    myStudio {
      id
      events {
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
      }
    }
  }
`
const STUDIO_EVENT_QUERY = gql`
  query($id: ID!) {
    studioEvent(id: $id) {
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
    }
  }
`
const STUDIO_HAIRSTYLE_QUERY = gql`
  query($id: ID!) {
    studioHairStyle(id: $id) {
      id
      name
      description
      image
      link
      studio {
        id
      }
    }
  }
`

const STUDIO_DANCER = gql`
  query($id: ID!) {
    studioDancer(id: $id) {
      id
      firstName
      lastName
      avatar
      parent {
        id
        firstName
        lastName
        email
      }
      danceClasses {
        studio {
          id
        }
        id
        name
      }
    }
  }
`
const STUDIO_MAKEUP_QUERY = gql`
  query STUDIO_MAKEUP_QUERY {
    myStudio {
      id
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
        applyToCategories
        notes
        danceClasses {
          id
          name
        }
        studio {
          id
        }
      }
    }
  }
`

const STUDIO_MAKEUPSET_QUERY = gql`
  query($id: ID!) {
    studioMakeupSet(id: $id) {
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
      applyToCategories
      notes
      danceClasses {
        id
        name
      }
      studio {
        id
      }
    }
  }
`

const HAIRSTYLES_QUERY = gql`
  query HAIRSTYLES_QUERY {
    studioHairStyles {
      id
      name
      description
      image
      link
    }
  }
`

export {
  STUDIO_USER_QUERY,
  CATEGORIES_QUERY,
  ALL_DANCE_CLASSES_QUERY,
  STUDIO_ALL_DANCERS_QUERY,
  SINGLE_DANCE_QUERY,
  ENROLLMENT_REQUESTS_QUERY,
  ACCESS_REQUESTS_QUERY,
  STUDIO_EVENTS_QUERY,
  STUDIO_EVENT_QUERY,
  STUDIO_DANCER,
  STUDIO_MAKEUP_QUERY,
  STUDIO_MAKEUPSET_QUERY,
  HAIRSTYLES_QUERY,
  STUDIO_HAIRSTYLE_QUERY,
  STUDIO_LINKED_PARENTS,
}
