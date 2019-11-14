import React, { Component } from "react";
import { Query } from "react-apollo";
import styled from "styled-components";

import DancerToggler from "./DancerToggler";
import DanceDisplayByStudio from "./DanceDisplayByStudio";
import IndependentRoutinesCheckboxes from "./IndependentRoutinesCheckboxes";
import { DANCER_QUERY } from "./DancerQuery";

{
  /* for each dancerId, query the dancer and get studios, dance classes and custom classes.  
      combine classes and custom classes
      render a checkbox for each studio.

      under each studio, render a checkbox for each dance that has that studio as its studio */
}

const DancerControlsStyle = styled.div`
  background-color: ${props => props.theme.gray1};
  display: grid;
  justify-items: start;
  border-radius: 5px;
  padding: 0.5rem 0.75rem;

  input[type="checkbox"] {
    margin-right: 0.5rem;
  }
`;

class DisplayController extends Component {
  render() {
    return (
      <Query query={DANCER_QUERY} variables={{ id: this.props.dancerId }}>
        {({ data, loading, error }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          const dancer = data ? data.dancer : {};
          dancer.allRoutines = [
            ...dancer.danceClasses,
            ...dancer.customRoutines,
          ];
          const independentRoutines = dancer.allRoutines.filter(
            routine => !routine.studio,
          );

          return (
            <DancerControlsStyle key={dancer.id}>
              <DancerToggler dancer={dancer} />

              {dancer.studios &&
                dancer.studios.map(studio => (
                  <DanceDisplayByStudio
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
        }}
      </Query>
    );
  }
}

export default DisplayController;
