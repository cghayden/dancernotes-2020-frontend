import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { PARENTS_STUDIOS } from "./Queries";

class MyStudios extends Component {
  render() {
    return (
      <Query query={PARENTS_STUDIOS}>
        {({ data: { parentStudios } = {}, error, loading }) => {
          if (error) return <Error error={error} />;
          if (loading) return <h5>Loading...</h5>;

          return (
            <div>
              <h3>My Studios:</h3>
              {parentStudios.map(studio => (
                <p key={studio.id}>{studio.studioName}</p>
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default MyStudios;
