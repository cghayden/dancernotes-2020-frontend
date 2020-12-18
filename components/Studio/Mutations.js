import gql from 'graphql-tag'

const REMOVE_DANCER_FROM_DANCE_MUTATION = gql`
  mutation REMOVE_DANCER_FROM_DANCE_MUTATION($dancerId: ID!, $danceId: ID!) {
    removeDancerFromDance(dancerId: $dancerId, danceId: $danceId) {
      message
    }
  }
`

export { REMOVE_DANCER_FROM_DANCE_MUTATION }
