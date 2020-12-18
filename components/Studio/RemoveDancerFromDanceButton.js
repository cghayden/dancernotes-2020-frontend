import { Component } from 'react'
import { Mutation } from 'react-apollo'
import { SINGLE_DANCE_QUERY } from './Queries'
import { REMOVE_DANCER_FROM_DANCE_MUTATION } from './Mutations'

class RemoveDancerFromDanceButton extends Component {
  render() {
    return (
      <Mutation
        mutation={REMOVE_DANCER_FROM_DANCE_MUTATION}
        variables={{
          danceId: this.props.danceId,
          dancerId: this.props.dancerId,
        }}
        refetchQueries={[
          { query: SINGLE_DANCE_QUERY, variables: { id: this.props.danceId } },
        ]}
      >
        {(removeDancerFromDance) => (
          <button onClick={async () => await removeDancerFromDance()}>
            Remove Dancer
          </button>
        )}
      </Mutation>
    )
  }
}

export default RemoveDancerFromDanceButton
