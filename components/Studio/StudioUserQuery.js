import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";

// get all account info for logged in studio

const STUDIO_USER_QUERY = gql`
  query STUDIO_USER_QUERY {
    myStudio {
      id
      email
      studioName
      danceClasses {
        id
        name
      }
      makeupSets {
        name
      }
    }
  }
`;

const StudioUserQuery = props => (
  <Query {...props} query={STUDIO_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

StudioUserQuery.propTypes = {
  children: PropTypes.func.isRequired,
};

export default StudioUserQuery;
export { STUDIO_USER_QUERY };
