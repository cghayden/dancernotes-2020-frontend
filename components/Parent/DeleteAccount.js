import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const DELETE_PARENT_ACCOUNT = gql`
  mutation DELETE_PARENT_ACCOUNT {
    deleteParentAccount {
      message
    }
  }
`;
export default function DeleteAccount() {
  const [deleteParentAccount, { loading, error }] = useMutation(
    DELETE_PARENT_ACCOUNT,
    {
      onCompleted: () => {
        console.log('account delete mutation complete');
        // Router.push('/');
        // client.clearStore();
      },
    }
  );
  async function deleteAccount() {
    await deleteParentAccount();
  }
  return (
    <button
      type='button'
      className='btn-danger'
      onClick={() => deleteAccount()}
    >
      Delete My Account
    </button>
  );
}
