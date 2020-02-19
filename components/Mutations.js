import gql from "graphql-tag";

const DELETE_CLOUDINARY_ASSET = gql`
  mutation DELETE_CLOUDINARY_ASSET($publicId: String!, $resourceType: String!) {
    deleteCloudinaryAsset(publicId: $publicId, resourceType: $resourceType) {
      message
    }
  }
`;

export { DELETE_CLOUDINARY_ASSET };
