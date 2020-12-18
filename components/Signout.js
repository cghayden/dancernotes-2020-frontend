// import { ApolloConsumer } from "react-apollo";
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Router from 'next/router'

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`

function Signout() {
  const [signout, { error, loading, client }] = useMutation(SIGN_OUT_MUTATION, {
    onCompleted: () => {
      Router.push(`/`)
      client.clearStore()
    },
  })
  return (
    <button
      role='button'
      className='btn-small btn-danger-outline'
      onClick={async () => await signout()}
    >
      Sign Out
    </button>
  )
}
export default Signout
export { SIGN_OUT_MUTATION }
