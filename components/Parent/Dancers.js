import React from "react";
import styled from "styled-components";
import Card from "../../components/styles/Card";
import DancerCard from "../../components/Parent/DancerCard";
const WelcomeMessage = styled(Card)`
  background: transparent;
`;

const Dancers = ({ hasDancers, dancers, addDancer, toggleAddDancer }) => {
  // if has dancers, show dancers cards
  if (hasDancers) {
    return (
      <>
        {dancers.map(dancer => (
          <DancerCard key={dancer.id} dancer={dancer} />
        ))}
      </>
    );
  }

  // if no dancers, show welcome and add dancer/browse studios
  if (!hasDancers) {
    return (
      <WelcomeMessage>
        <div className="card__section">
          <p>
            Welcome to Dancernotes! To begin, add a Dancer to your account, or
            simply browse classes at a participating studio near you
          </p>
        </div>
        <button
          className="btn-dark"
          onClick={() => toggleAddDancer(!addDancer)}
        >
          {!addDancer ? `Add a Dancer` : `Cancel`}
        </button>
      </WelcomeMessage>
    );
  }
};

export default Dancers;
