import gql from "graphql-tag";

const UPDATE_CATEGORY_MUTATION = gql`
  mutation UPDATE_CATEGORY_MUTATION($category: String!, $items: [String]!) {
    updateStudioClassCategory(category: $category, items: $items) {
      id
    }
  }
`;

export { UPDATE_CATEGORY_MUTATION };
