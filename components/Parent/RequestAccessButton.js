import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { PARENT_USER_QUERY } from "./Queries";
// import { BROWSE_STUDIO_CLASSES_QUERY } from "../../pages/parent/account/browseStudio";

const REQUEST_STUDIO_ACCESS = gql`
  mutation REQUEST_STUDIO_ACCESS($studioId: ID!, $accessRequests: [ID!]!) {
    requestStudioAccess(studioId: $studioId, accessRequests: $accessRequests) {
      id
      accessRequests
    }
  }
`;

function RequestAccessButton({ accessRequests, studioId }) {
  const [requestStudioAccess, { data, error, loading }] = useMutation(
    REQUEST_STUDIO_ACCESS,
    {
      refetchQueries: [{ query: PARENT_USER_QUERY }],
      onCompleted: data => console.log("data:", data)
    }
  );
  return (
    <button
      disabled={loading}
      className="btn-action-primary"
      onClick={async () => {
        const newAccessRequests = [...accessRequests, studioId];
        await requestStudioAccess({
          variables: { accessRequests: newAccessRequests, studioId }
        });
      }}
    >
      {`Request${loading ? "ing..." : ""} Notes`}
    </button>
  );
}
export default RequestAccessButton;
