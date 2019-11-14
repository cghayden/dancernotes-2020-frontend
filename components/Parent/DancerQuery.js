import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";

// get all account info for a dancer

const DANCER_QUERY = gql`
  query DANCER_QUERY($id: ID!) {
    dancer(where: { id: $id }) {
      id
      firstName
      avatar
      danceClasses {
        id
        name
        studio {
          id
        }
      }
      customRoutines {
        id
        name
        studio {
          id
        }
      }
      studios {
        id
        studioName
      }
      requests {
        id
        classesRequested {
          id
        }
      }
    }
  }
`;

const DancerQuery = props => (
  <Query {...props} query={DANCER_QUERY} variables={{ id: props.dancerId }}>
    {payload => props.children(payload)}
  </Query>
);

DancerQuery.propTypes = {
  children: PropTypes.func.isRequired,
  dancerId: PropTypes.string.isRequired,
};

export default DancerQuery;
export { DANCER_QUERY };
