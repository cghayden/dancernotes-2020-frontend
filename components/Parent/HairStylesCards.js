import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import HairStyleCard from "./HairStyleCard";
import Card from "../styles/Card";
import styled from "styled-components";

const HAIRSTYLES_QUERY = gql`
  query HAIRSTYLES_QUERY {
    parentStudios {
      studioName
      hairStyles {
        id
        image
        name
        description
        link
      }
    }
  }
`;

class HairStylesCards extends Component {
  render() {
    return (
      <Query query={HAIRSTYLES_QUERY}>
        {({ data: { parentStudios } = {}, error, loading }) => {
          if (loading) return <p>loading...</p>;
          if (error) return <p>Error! {error}</p>;
          return (
            <>
              {parentStudios.map(studio => {
                return (
                  <Card>
                    <div className="card__header">
                      <h2>Studio: {studio.studioName}</h2>
                    </div>
                    {studio.hairStyles.length ? (
                      <>
                        <div>
                          {studio.hairStyles.map(style => (
                            <HairStyleCard hairStyle={style} key={style.id} />
                          ))}
                        </div>
                      </>
                    ) : (
                      <p>{studio.studioName} has no Hair Styles to view.</p>
                    )}
                  </Card>
                );
              })}
            </>
          );
        }}
      </Query>
    );
  }
}

export default HairStylesCards;
