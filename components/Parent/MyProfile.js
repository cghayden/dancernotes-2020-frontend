import { useState } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import Card from '../styles/Card'
import DancernotesInfo from '../DancernotesInfo'
import UpdateProfileForm from './UpdateProfileForm'
import Signout from '../Signout'

const REQUEST_RESET_PASSWORD = gql`
  mutation REQUEST_RESET_PASSWORD($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`

const ResetButton = styled.button``

const NoteItem = styled.div`
  display: flex;
  padding: 0.25rem 0;
`

const Dt = styled.dt`
  font-weight: bold;
`
const Dd = styled.dd`
  margin-left: 1rem;
  text-align: left;
  white-space: pre-wrap;
`

const AccountCardOptions = styled.div`
  display: flex;
  justify-content: space-around;
`

function MyProfile({ parentUser }) {
  const [confirmResetRequest, setConfirmResetRequest] = useState()
  const [requestReset, { loading, error, called }] = useMutation(
    REQUEST_RESET_PASSWORD,
    {
      variables: { email: parentUser.email },
      onCompleted: () => {
        setConfirmResetRequest(
          'Check your email for a link that will allow you to reset your password...'
        )
      },
    }
  )
  return (
    <>
      <Card>
        <dl>
          <NoteItem>
            <Dt>First Name:</Dt> <Dd>{parentUser.firstName}</Dd>
          </NoteItem>
          <NoteItem>
            <Dt>Email:</Dt> <Dd>{parentUser.email}</Dd>
          </NoteItem>
        </dl>
        <AccountCardOptions>
          {confirmResetRequest && <p>{confirmResetRequest}</p>}
          <button
            role='button'
            className='btn-small btn-action-primary-outline'
          >
            Edit
          </button>
          <ResetButton
            type='button'
            className='btn-small btn-danger-outline'
            onClick={() => requestReset()}
          >
            Reset my Password
          </ResetButton>
          <Signout />
        </AccountCardOptions>
      </Card>
      <UpdateProfileForm parentUser={parentUser} />
      <Card>
        <div className='card-section'>
          <DancernotesInfo />
        </div>
      </Card>
    </>
  )
}

export default MyProfile
