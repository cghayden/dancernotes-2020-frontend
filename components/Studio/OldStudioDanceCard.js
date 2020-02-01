import React, { Component } from "react";
import styled from "styled-components";
import Link from "next/link";
import Card from "../styles/Card";
import Edit from "../Icons/Edit";

const EditLink = styled.a`
  padding: 0;
  margin: 0;
  box-shadow: none;
  background-color: transparent;
  border: none;
`;

class StudioDanceCard extends Component {
  render() {
    const { dance } = this.props;
    return (
      <Card key={dance.id}>
        <div className="card__header">
          <h2>{dance.name}</h2>
          <h2>{dance.performanceName}</h2>
          <div className="card__header--editButton">
            <Link
              href={{
                pathname: "danceClass",
                query: { id: dance.id }
              }}
            >
              <EditLink onClick={() => console.log("switch view")}>
                <Edit />
              </EditLink>
            </Link>
          </div>
        </div>
        <div>
          <p>ageDivision: {dance.ageDivision}</p>
          <p>competitiveLevel: {dance.competitiveLevel}</p>
          <p>Style: {dance.style}</p>
          <p>Size: {dance.size}</p>
        </div>
        <div>
          <h3>Music</h3>
          (Player / Name)
        </div>
        <div>
          <h3>Dancers</h3>
          <Link
            href={{
              pathname: "addDancers",
              query: { id: dance.id }
            }}
          >
            <button>Add / Remove Dancers</button>
          </Link>
          {dance.dancers.map((dancer, index) => (
            <p key={index}>{dancer.firstName}</p>
          ))}
        </div>
        <div>
          <h3>Day and Time</h3>
          <p>
            {dance.day} {dance.startTime} - {dance.endTime}
          </p>
        </div>
        <div>
          <h3>Notes</h3>
          <ul>
            <li>Tights: {dance.tights}</li>
            <li>Shoes: {dance.shoes}</li>
            <li>Notes: {dance.notes}</li>
          </ul>
        </div>
        <div>
          <h3>Makeup</h3>
          {dance.makeupSet && dance.makeupSet.name}
        </div>
        <div>
          <h3>Hair</h3>
          {dance.hairStyle}
        </div>
      </Card>
    );
  }
}

export default StudioDanceCard;
