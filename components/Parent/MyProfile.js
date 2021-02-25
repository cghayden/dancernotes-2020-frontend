import { useState } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import Card from '../styles/Card'
import DancernotesInfo from '../DancernotesInfo'
import UpdateProfileForm from './UpdateProfileForm'
import Signout from '../Signout'
import { useToggle } from '../../utilities/useToggle'
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
  display: grid;
  grid-gap: 20px;
`
const MessageDivStyle = styled.div`
  color: ${(props) => props.theme.red7};
`

const OptionsDivStyle = styled.div`
  display: flex;
  justify-content: space-around;
`
function MyProfile({ parentUser }) {
  const { isToggled, toggle } = useToggle()
  const [confirmResetRequest, setConfirmResetRequest] = useState()
  const [requestReset, { loading, error, called }] = useMutation(
    REQUEST_RESET_PASSWORD,
    {
      variables: { email: parentUser.email },
      onCompleted: () => {
        setConfirmResetRequest(
          'An email has been sent to your Dancer Notes User-Id email that contains a link that will allow you to reset your password...'
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
          <MessageDivStyle>
            {confirmResetRequest && <p>{confirmResetRequest}</p>}
          </MessageDivStyle>
          <OptionsDivStyle>
            <button
              type='button'
              onClick={toggle}
              className='btn-small btn-action-primary-outline'
            >
              Edit
            </button>
            <ResetButton
              type='button'
              className='btn-small btn-danger-outline'
              onClick={() => {
                if (confirm('Would you like to reset your password?')) {
                  requestReset()
                }
              }}
            >
              Reset my Password
            </ResetButton>
            <Signout />
          </OptionsDivStyle>
        </AccountCardOptions>
      </Card>
      {isToggled && <UpdateProfileForm parentUser={parentUser} />}
      <Card>
        <div>
          <DancernotesInfo />
        </div>
      </Card>
    </>
  )
}

export default MyProfile
