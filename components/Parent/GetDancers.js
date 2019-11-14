import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";

//get dancers from a user with users id
const PARENTS_DANCERS_QUERY = gql`
  query {
    parentsDancers {
      firstName
      id
      studios {
        studioName
        id
      }
    }
  }
`;

const GetDancers = props => (
  <Query {...props} query={PARENTS_DANCERS_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

GetDancers.propTypes = {
  children: PropTypes.func.isRequired,
};

export default GetDancers;
