import gql from "graphql-tag";

const UPDATE_CATEGORY_MUTATION = gql`
  mutation UPDATE_CATEGORY_MUTATION($category: String!, $items: [String]!) {
    updateStudioClassCategory(category: $category, items: $items) {
      id
    }
  }
`;

const DELETE_CLOUDINARY_ASSET = gql`
  mutation DELETE_CLOUDINARY_ASSET($publicId: String!, $resourceType: String!) {
    deleteCloudinaryAsset(publicId: $publicId, resourceType: $resourceType) {
      message
    }
  }
`;

export { UPDATE_CATEGORY_MUTATION, DELETE_CLOUDINARY_ASSET };
