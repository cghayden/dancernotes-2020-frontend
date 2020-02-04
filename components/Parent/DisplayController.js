import React from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Link from "next/link";
import DancerToggler from "./DancerToggler";
import StudioRoutinesCheckboxes from "./StudioRoutinesCheckboxes";
import IndependentRoutinesCheckboxes from "./IndependentRoutinesCheckboxes";
import { DANCER_QUERY } from "./Queries";

{
  /* for each dancerId, query the dancer and get studios, dance classes and custom classes.  
      combine classes and custom classes
      render a checkbox for each studio.

      under each studio, render a checkbox for each dance that has that studio as its studio */
}

const DancerControlsStyle = styled.div`
  background-color: ${props => props.theme.gray1};
  display: flex;
  flex-direction: column;
  /* grid-gap: 1rem; */
  /* justify-items: start; */
  align-items: center;
  border-radius: 5px;
  padding-bottom: 1rem;
  padding-right: 1rem;
  padding-left: 1rem;
  padding-top: 0.5rem;
  margin-bottom: 1rem;
  box-shadow: ${props => props.theme.dropShadow1};

  input[type="checkbox"] {
    margin-right: 0.5rem;
  }
`;

function DisplayController({ dancerId }) {
  const { data, loading, error } = useQuery(DANCER_QUERY, {
    variables: { id: dancerId }
  });
  if (loading) return null;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  const dancer = data.dancer;
  dancer.allRoutines = [...dancer.danceClasses, ...dancer.customRoutines];
  const independentRoutines = dancer.allRoutines.filter(
    routine => !routine.studio
  );
  return (
    <DancerControlsStyle key={dancer.id}>
      <DancerToggler dancer={dancer} />
      {dancer.allRoutines.length < 1 && (
        <Link href="/parent/account/dancers">
          <a className="textOnly-primary-action">Create or Find a Class</a>
        </Link>
      )}
      {dancer.studios &&
        dancer.studios.map(studio => (
          <StudioRoutinesCheckboxes
            allRoutines={dancer.allRoutines}
            studioName={studio.studioName}
            studioId={studio.id}
            key={studio.id}
            dancerId={dancer.id}
          />
        ))}

      {independentRoutines.length > 0 && (
        <IndependentRoutinesCheckboxes
          dancerId={dancer.id}
          routines={independentRoutines}
        />
      )}
    </DancerControlsStyle>
  );
}

export default DisplayController;
