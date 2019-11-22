import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
const DELETE_AVATAR = gql`
  mutation DELETE_AVATAR($existingAvatarId: String!) {
    deleteAvatar(existingAvatarId: $existingAvatarId) {
      message
    }
  }
`;

const CancelUpdateDancerButton = ({ toggleAddDancer, existingAvatarId }) => {
  const [deleteAvatar, { data, loading, error }] = useMutation(DELETE_AVATAR, {
    variables: { existingAvatarId }
  });
  return (
    <button
      type="button"
      onClick={async () => {
        if (existingAvatarId) {
          console.log(
            "Canceling... need to delete the avatar that was just loaded"
          );
          await deleteAvatar();
        }
        toggleAddDancer(false);
      }}
    >
      Cancel
    </button>
  );
};

export default CancelUpdateDancerButton;
