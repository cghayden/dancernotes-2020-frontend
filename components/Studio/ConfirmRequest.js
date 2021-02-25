import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import Error from '../../components/Error'
import { STUDIO_REQUESTS_QUERY } from './Queries'
import styled from 'styled-components'

const ConfirmButton = styled.button`
  background: ${(props) => props.theme.teal5};
  transition: background-color 0.5s linear infinite;
  color: white;

  :disabled {
    background: ${(props) => props.theme.red2};
    /* animation: ${this.state.loading} 0.5s linear infinite; */
  }
`

const CONFIRM_ENROLLMENT_REQUEST = gql`
  mutation CONFIRM_ENROLLMENT_REQUEST(
    $danceClassId: ID!
    $dancerId: ID!
    $requestId: ID!
    $parentId: ID!
  ) {
    confirmEnrollmentRequest(
      danceClassId: $danceClassId
      dancerId: $dancerId
      requestId: $requestId
      parentId: $parentId
    ) {
      message
    }
  }
`

export default function ConfirmRequest({ request }) {
  const [confirmEnrollmentRequest, { error, loading }] = useMutation(
    CONFIRM_ENROLLMENT_REQUEST,
    {
      variables: {
        requestId: request.id,
        danceClassId: request.classRequested.id,
        dancerId: request.dancer.id,
        parentId: request.parent.id,
      },
      refetchQueries: [{ query: STUDIO_REQUESTS_QUERY }],
    }
  )

  return (
    <>
      {error && <Error error={error} />}

      <ConfirmButton
        disabled={loading}
        onClick={() => confirmEnrollmentRequest()}
      >
        {loading ? `Enrolling...` : 'Confirm: Enroll Student'}
      </ConfirmButton>
    </>
  )
}
