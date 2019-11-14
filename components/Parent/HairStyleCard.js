import React, { useState } from "react";
import styled from "styled-components";
import Card from "../styles/Card";

const HairImage = styled.div`
  text-align: center;
  img {
    width: 300px;
    height: 300px;
  }
`;

const HairCard = styled(Card)`
  a {
    margin: 0;
    /* padding: 0; */
    background: white;
  }
`;

function HairStyleCard(props) {
  const { hairStyle } = props;
  return (
    <HairCard>
      <div className="card__header">
        <h3>{hairStyle.name}</h3>
      </div>
      {hairStyle.image && (
        <HairImage>
          <img
            src={hairStyle.image}
            alt={`Image of hair style called ${hairStyle.name}`}
          />
        </HairImage>
      )}
      <div className="card__section">
        <h4>Description: </h4>
        <p>{hairStyle.description}</p>
      </div>
      <div className="card__section">
        {hairStyle.link && (
          <a href={hairStyle.link} target="_blank">
            Watch an Intructional Video
          </a>
        )}
      </div>
    </HairCard>
  );
}

export default HairStyleCard;
