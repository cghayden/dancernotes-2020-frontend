import gql from "graphql-tag";

const REMOVE_CLASS_FROM_REQUEST = gql`
  mutation REMOVE_CLASS_FROM_REQUEST($classId: ID!, requestId: ID!){
    removeClassFromRequest(classId: $classId, requestId: $requestId){
      classesRequested{
        name
      }
    }
  }
`;

export { REMOVE_CLASS_FROM_REQUEST };
