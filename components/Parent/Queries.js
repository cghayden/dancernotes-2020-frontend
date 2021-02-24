import gql from 'graphql-tag'

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
        studioName
      }
      entryNumber
      entryDay
      entryTime
      videoUrl
    }
  }
`

const SINGLE_ROUTINE_QUERY = gql`
  query SINGLE_ROUTINE_QUERY($id: ID!) {
    singleRoutine(id: $id) {
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
        parent {
          id
        }
      }
      studio {
        id
        studioName
      }
      entryNumber
      entryDay
      entryTime
      videoUrl
    }
  }
`

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
`

const CUSTOM_EVENTS_QUERY = gql`
  query {
    customEvents {
      id
      name
      type
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
`

const PARENT_USER_QUERY = gql`
  query {
    parentUser {
      agreedToTermsAndPrivacy
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
        website
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
        parent {
          id
        }
      }
      accessRequests
    }
  }
`

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
`

const PARENTS_DANCERS = gql`
  query PARENTS_DANCERS {
    parentsDancers {
      id
      firstName
      avatar
      studios {
        id
        studioName
        email
      }
      danceClasses {
        id
        name
        performanceName
      }
      customRoutines {
        id
        name
        performanceName
      }
    }
  }
`

const CUSTOM_ROUTINE_QUERY = gql`
  query CUSTOM_ROUTINE_QUERY($id: ID!) {
    customRoutine(id: $id) {
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
`
const DANCER_QUERY = gql`
  query DANCER_QUERY($id: ID!) {
    dancer(id: $id) {
      id
      firstName
      parent {
        id
      }
      avatar
      avatarId
      danceClasses {
        id
        name
        studio {
          id
          studioName
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
        email
      }
      requests {
        id
        studio {
          id
        }
        classRequested {
          id
        }
      }
    }
  }
`
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
`

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
`

const HAIRSTYLES_QUERY = gql`
  query HAIRSTYLES_QUERY {
    parentHairstyles {
      studioName
      hairStyles {
        id
        image
        name
        description
        link
      }
    }
  }
`

export {
  PARENT_USER_QUERY,
  DANCER_QUERY,
  ALL_Rs,
  SINGLE_ROUTINE_QUERY,
  PARENT_EVENTS_QUERY,
  PARENTS_DANCERS,
  CUSTOM_ROUTINE_QUERY,
  STUDIOS_AND_DANCERS,
  PARENTS_MAKEUP_QUERY,
  CUSTOM_EVENTS_QUERY,
  STUDIO_CARD_QUERY,
  HAIRSTYLES_QUERY,
}
