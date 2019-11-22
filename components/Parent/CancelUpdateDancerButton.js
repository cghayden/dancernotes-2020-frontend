import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
const DELETE_AVATAR = gql`
  mutation DELETE_AVATAR($targetAvatarId: String!) {
    deleteAvatar(targetAvatarId: $targetAvatarId) {
      message
    }
  }
`;

const CancelUpdateDancerButton = ({
  toggleAddDancer,
  targetAvatarId,
  closeFunc
}) => {
  const [deleteAvatar, { data, loading, error }] = useMutation(DELETE_AVATAR, {
    variables: { targetAvatarId }
  });
  return (
    <button
      type="button"
      onClick={async () => {
        if (targetAvatarId) {
          console.log(
            "Canceling... need to delete the avatar that was just loaded"
          );
          await deleteAvatar();
        }
        toggleAddDancer ? toggleAddDancer(false) : closeFunc();
      }}
    >
      Cancel
    </button>
  );
};

export default CancelUpdateDancerButton;
