import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import Router from 'next/router'

const DELETE_PARENT_ACCOUNT = gql`
  mutation DELETE_PARENT_ACCOUNT {
    deleteParentAccount {
      message
    }
  }
`
export default function DeleteAccount() {
  const [deleteParentAccount, { loading, error, client }] = useMutation(
    DELETE_PARENT_ACCOUNT,
    {
      onCompleted: (data) => {
        console.log('complete : data:', data)
        client.clearStore()
        Router.push('/')
      },
    }
  )
  async function deleteAccount() {
    if (confirm('Do you really want to delete your account?')) {
      await deleteParentAccount()
    }
  }
  return (
    <button
      type='button'
      className='btn-danger'
      onClick={() => deleteAccount()}
    >
      Delete My Account
    </button>
  )
}
