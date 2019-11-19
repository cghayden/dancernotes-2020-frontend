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

const StudioHair = styled.div`
  .studioHair__cards {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

class HairStylesCards extends Component {
  render() {
    return (
      <Query query={HAIRSTYLES_QUERY}>
        {({ data: { parentStudios } = {}, error, loading }) => {
          console.log("parentStudios:", parentStudios);
          if (loading) return <p>loading...</p>;
          if (error) return <p>Error! {error}</p>;
          return (
            <>
              {parentStudios.map(studio => {
                return (
                  <>
                    {studio.hairStyles.length ? (
                      <StudioHair>
                        <h2 className="subHeading">
                          Studio: {studio.studioName}
                        </h2>
                        <div className="studioHair__cards">
                          {studio.hairStyles.map(style => (
                            <HairStyleCard hairStyle={style} key={style.id} />
                          ))}
                        </div>
                      </StudioHair>
                    ) : (
                      <p>{studio.name} has no Hair Styles to view.</p>
                    )}
                  </>
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
