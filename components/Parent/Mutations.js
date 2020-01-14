import gql from "graphql-tag";

const REQUEST_STUDIO_ACCESS = gql`
  mutation REQUEST_STUDIO_ACCESS($studioId: ID!, $accessRequests: [ID!]!) {
    requestStudioAccess(studioId: $studioId, accessRequests: $accessRequests) {
      message
    }
  }
`;

export { REQUEST_STUDIO_ACCESS };
