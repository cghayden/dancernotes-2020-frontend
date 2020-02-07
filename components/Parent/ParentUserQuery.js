import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";

const PARENT_USER_QUERY = gql`
  query {
    parentUser {
      firstName
      id
      email
      dancersIds
      dancers {
        id
        firstName
        avatar
        studios {
          studioName
          id
        }
        danceClasses {
          id
          name
          studio {
            id
          }
        }
      }
    }
  }
`;

const ParentUser = props => (
  <Query {...props} query={PARENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

ParentUser.propTypes = {
  children: PropTypes.func.isRequired
};

export default ParentUser;
export { PARENT_USER_QUERY };
